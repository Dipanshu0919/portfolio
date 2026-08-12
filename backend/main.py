"""
main.py — FastAPI backend for Dipanshu's portfolio.

Routes:
  GET  /                      → serves portfolio.html
  GET  /api/health            → health check + sandbox status
  GET  /api/session/status    → Python session status
  POST /api/python/execute    → execute Python in isolated sandbox
  DELETE /api/session         → reset Python session

Security:
  - User code is NEVER executed inside this process
  - A subprocess runs runner.py with the user code
  - Global semaphore limits to MAX_CONCURRENT_EXECUTIONS=1
  - Input validation enforces MAX_CODE_SIZE
"""

import asyncio
import json
import os
import sys
import time
import subprocess
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, field_validator

# ─── Config ───────────────────────────────────────────────────────────────────
MAX_EXECUTION_TIME    = int(os.environ.get("MAX_EXECUTION_TIME", "5"))          # seconds
MAX_MEMORY_MB         = int(os.environ.get("MAX_MEMORY_MB", "128"))
MAX_OUTPUT_KB         = int(os.environ.get("MAX_OUTPUT_KB", "64"))
MAX_CODE_SIZE_KB      = int(os.environ.get("MAX_CODE_SIZE_KB", "32"))
MAX_CONCURRENT        = int(os.environ.get("MAX_CONCURRENT_EXECUTIONS", "1"))

# Paths
BASE_DIR     = Path(__file__).parent
FRONTEND_DIR = BASE_DIR.parent
RUNNER_PATH  = BASE_DIR / "runner.py"
HTML_PATH    = FRONTEND_DIR / "portfolio.html"

# ─── FastAPI app ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Dipanshu Portfolio API",
    docs_url=None,   # Hide API docs from public
    redoc_url=None,
)

# Global semaphore — limits concurrent Python executions
_execution_semaphore = asyncio.Semaphore(MAX_CONCURRENT)
_execution_count = 0

# ─── Session manager ──────────────────────────────────────────────────────────
from .session_manager import session_manager  # noqa: E402

# ─── Request models ───────────────────────────────────────────────────────────
class ExecuteRequest(BaseModel):
    code: str

    @field_validator("code")
    @classmethod
    def check_code_size(cls, v: str) -> str:
        max_bytes = MAX_CODE_SIZE_KB * 1024
        if len(v.encode("utf-8")) > max_bytes:
            raise ValueError(
                f"Code exceeds maximum size of {MAX_CODE_SIZE_KB} KB. "
                f"Please reduce the code length."
            )
        return v

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def serve_portfolio():
    """Serve the portfolio HTML."""
    if not HTML_PATH.exists():
        raise HTTPException(status_code=404, detail="portfolio.html not found")
    return HTMLResponse(content=HTML_PATH.read_text(encoding="utf-8"))


@app.get("/style.css")
async def serve_css():
    """Serve the external stylesheet."""
    css_path = FRONTEND_DIR / "style.css"
    if not css_path.exists():
        raise HTTPException(status_code=404, detail="style.css not found")
    return FileResponse(css_path, media_type="text/css")


@app.get("/script.js")
async def serve_js():
    """Serve the external JavaScript."""
    js_path = FRONTEND_DIR / "script.js"
    if not js_path.exists():
        raise HTTPException(status_code=404, detail="script.js not found")
    return FileResponse(js_path, media_type="application/javascript")


@app.get("/api/health")
async def health():
    """Health check and sandbox availability."""
    busy = _execution_semaphore.locked()
    return {
        "status": "ok",
        "sandbox": "busy" if busy else "ready",
        "max_execution_time": MAX_EXECUTION_TIME,
        "max_memory_mb": MAX_MEMORY_MB,
        "max_output_kb": MAX_OUTPUT_KB,
    }


@app.get("/api/session/status")
async def get_session_status():
    """Return Python session status (no user data, just metadata)."""
    return await session_manager.status()


@app.delete("/api/session")
async def reset_session():
    """Reset the Python session (clear all variables)."""
    await session_manager.reset()
    return {"status": "reset", "message": "Session cleared."}


@app.post("/api/python/execute")
async def execute_python(req: ExecuteRequest):
    """
    Execute Python code in an isolated subprocess sandbox.

    Request:  {"code": "print('hello')"}
    Response: {
        "stdout":       "hello\\n",
        "stderr":       "",
        "timed_out":    false,
        "error":        null,
        "execution_ms": 42,
        "session":      {"active": true, "expires_in_seconds": 285, "variable_count": 2}
    }
    """
    global _execution_count

    # Try to acquire the execution slot (non-blocking check first)
    acquired = _execution_semaphore.locked()
    if acquired:
        return JSONResponse(
            status_code=503,
            content={
                "stdout": "",
                "stderr": "Python sandbox is currently busy. Please try again shortly.",
                "timed_out": False,
                "error": "busy",
                "execution_ms": 0,
                "session": await session_manager.status(),
            },
        )

    async with _execution_semaphore:
        _execution_count += 1
        start_time = time.monotonic()

        # Get current session state
        state = await session_manager.get_state()

        payload = json.dumps({
            "code": req.code,
            "state": state,
        })

        timed_out = False
        proc_result = None
        stderr_text = ""
        stdout_text = ""
        new_state = {}

        try:
            # Run isolated subprocess — NEVER eval/exec inside this process
            proc_result = await asyncio.wait_for(
                asyncio.get_event_loop().run_in_executor(
                    None,
                    lambda: subprocess.run(
                        [sys.executable, str(RUNNER_PATH)],
                        input=payload,
                        capture_output=True,
                        text=True,
                        timeout=MAX_EXECUTION_TIME + 2,  # +2 for process startup overhead
                        env={
                            # Minimal clean environment — do NOT pass os.environ
                            # to avoid exposing host credentials/secrets to user code
                            "PATH": "/usr/local/bin:/usr/bin:/bin",
                            "HOME": "/tmp",
                            "PYTHONDONTWRITEBYTECODE": "1",
                            # PYTHONPATH must include backend dir so runner can import portfolio_module
                            "PYTHONPATH": str(BASE_DIR),
                            # Sandbox limits for runner.py
                            "MAX_EXECUTION_TIME": str(MAX_EXECUTION_TIME),
                            "MAX_MEMORY_MB": str(MAX_MEMORY_MB),
                            "MAX_OUTPUT_KB": str(MAX_OUTPUT_KB),
                        },
                    ),
                ),
                timeout=MAX_EXECUTION_TIME + 3,
            )
        except asyncio.TimeoutError:
            timed_out = True
        except subprocess.TimeoutExpired:
            timed_out = True

        elapsed_ms = int((time.monotonic() - start_time) * 1000)

        if timed_out:
            return JSONResponse(content={
                "stdout": "",
                "stderr": f"Execution timed out after {MAX_EXECUTION_TIME} seconds.\n\nHint: check for infinite loops (while True: ...) or very slow operations.",
                "timed_out": True,
                "error": "timeout",
                "execution_ms": elapsed_ms,
                "session": await session_manager.status(),
            })

        # Parse runner output
        if proc_result is not None:
            raw_stdout = proc_result.stdout
            raw_stderr = proc_result.stderr  # runner's own stderr (bugs in runner)

            try:
                result = json.loads(raw_stdout)
                stdout_text = result.get("stdout", "")
                stderr_text = result.get("stderr", "")
                error_type  = result.get("error", None)
                new_state   = result.get("state", {})
            except json.JSONDecodeError:
                # Runner was killed by signal before writing JSON output
                # (OOM killer, SIGKILL from timeout, SIGSEGV, etc.)
                rc = proc_result.returncode if proc_result else "?"
                raw_err = (raw_stderr or "").strip()[:800]
                stderr_text = (
                    f"The Python sandbox was terminated by the OS (exit code {rc}).\n"
                    + (f"Runner stderr: {raw_err}" if raw_err else
                       "This usually means the process ran out of memory or hit a resource limit.")
                )
                error_type = "sandbox_crash"
                new_state = {}

            # Check for memory-related exit codes
            if proc_result.returncode in (-9, -11):  # SIGKILL, SIGSEGV
                stderr_text = (
                    "Memory limit exceeded or process killed.\n"
                    "Try using smaller data structures."
                )
                error_type = "memory_exceeded"

            # Save state only if no error (preserve clean state)
            if not error_type or error_type in ("runtime_error", "syntax_error"):
                if new_state:
                    await session_manager.save_state(new_state)
                elif not error_type:
                    # Successful execution with no variables — reset state to clean
                    await session_manager.save_state({})

        else:
            stderr_text = "Unknown execution error."
            error_type = "unknown"

        return JSONResponse(content={
            "stdout": stdout_text,
            "stderr": stderr_text,
            "timed_out": timed_out,
            "error": error_type if stderr_text else None,
            "execution_ms": elapsed_ms,
            "session": await session_manager.status(),
        })


# ─── Run directly ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
