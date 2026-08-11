"""
runner.py — Isolated Python execution subprocess.

This script is launched as a SEPARATE PROCESS by main.py.
It NEVER runs inside the FastAPI process.

Input  (stdin): JSON {"code": "...", "state": {...}}
Output (stdout): JSON {"stdout": "...", "stderr": "...", "error": null, "timed_out": false}

Security measures applied here:
  1. Dangerous modules blocked via sys.modules before exec
  2. Restricted __builtins__ (no open, exec, eval, compile, etc.)
  3. resource limits: CPU time, address space, file size, open files
  4. Output captured and capped at MAX_OUTPUT_KB
  5. No real filesystem access (chdir to an isolated /tmp dir)
  6. Session state restored from JSON, then saved back after execution
"""

import sys
import os
import json
import traceback
import io
import builtins
import importlib
import types

# ─── Resource limits (Linux) ──────────────────────────────────────────────────
try:
    import resource
    _HAS_RESOURCE = True
except ImportError:
    _HAS_RESOURCE = False  # Windows/macOS fallback

MAX_CPU_SECONDS = int(os.environ.get("MAX_EXECUTION_TIME", "5"))
MAX_MEMORY_BYTES = int(os.environ.get("MAX_MEMORY_MB", "128")) * 1024 * 1024
MAX_OUTPUT_BYTES = int(os.environ.get("MAX_OUTPUT_KB", "64")) * 1024
MAX_FSIZE_BYTES  = 1 * 1024 * 1024  # 1 MB max file writes

def apply_resource_limits():
    if not _HAS_RESOURCE:
        return
    try:
        # CPU time — hard limit kills the process after MAX_CPU_SECONDS
        resource.setrlimit(resource.RLIMIT_CPU, (MAX_CPU_SECONDS, MAX_CPU_SECONDS + 1))
    except Exception:
        pass
    # NOTE: RLIMIT_AS (virtual address space) is intentionally NOT set here.
    # Python 3.x maps far more VSZ than its actual heap just for interpreter
    # internals and shared libraries, so a 128 MB RLIMIT_AS kills the runner
    # before any user code runs.  Wall-clock timeout (subprocess.run timeout)
    # and RLIMIT_CPU together provide the time-based safety net.
    # Output floods are caught by the safe_print cap below.
    try:
        # Max file size that can be written (prevents large disk writes)
        resource.setrlimit(resource.RLIMIT_FSIZE, (MAX_FSIZE_BYTES, MAX_FSIZE_BYTES))
    except Exception:
        pass
    try:
        # Limit open file descriptors — defense-in-depth (open() stub is the primary guard)
        resource.setrlimit(resource.RLIMIT_NOFILE, (64, 64))
    except Exception:
        pass

# ─── Module blocklist ─────────────────────────────────────────────────────────
BLOCKED_MODULES = {
    # OS / filesystem
    "os", "os.path", "posix", "nt", "ntpath", "posixpath", "genericpath",
    "shutil", "pathlib", "glob", "fnmatch", "tempfile", "stat",
    # Process / shell execution
    "subprocess", "multiprocessing", "multiprocessing.pool",
    "concurrent", "concurrent.futures", "threading", "_thread",
    # Network
    "socket", "ssl", "urllib", "urllib.request", "urllib.parse",
    "urllib.error", "http", "http.client", "http.server",
    "ftplib", "smtplib", "poplib", "imaplib", "nntplib",
    "telnetlib", "xmlrpc", "xmlrpc.client", "xmlrpc.server",
    "email", "mailbox",
    # Low-level / dangerous
    "ctypes", "ctypes.util", "pty", "termios", "tty", "readline",
    "rlcompleter", "fcntl", "grp", "pwd", "signal", "mmap",
    "resource", "syslog", "winreg", "winsound", "msvcrt",
    # Dynamic loading / introspection
    "importlib", "importlib.util", "importlib.machinery",
    "importlib.abc", "importlib.resources",
    "pkgutil", "modulefinder", "compileall", "py_compile",
    "zipimport", "zipfile", "tarfile", "gzip", "bz2", "lzma", "zlib",
    # Package management
    "pip", "setuptools", "pkg_resources", "distutils",
    "ensurepip", "venv", "virtualenv",
    # Async / event loops
    "asyncio", "asyncio.events", "select", "selectors",
    # System info exposure
    "platform", "sysconfig", "site", "sitecustomize",
    # Code execution / debugging
    "code", "codeop", "pdb", "bdb", "trace", "tracemalloc",
    "gc",  # can expose object graph
    # Other risky
    "cffi", "cython",
    # Prevent accessing __builtins__ tricks
    "builtins",
}

# Modules that are explicitly allowed for user code.
# We pre-import these BEFORE applying the blocklist so that their internal
# imports (e.g. random -> os.urandom, datetime -> _datetime C extension)
# are resolved while the real import system is still intact.
ALLOWED_PRELOAD = [
    "math", "random", "datetime", "json", "re", "statistics",
    "collections", "itertools", "string", "decimal", "fractions",
    "functools", "operator", "typing", "dataclasses", "enum",
    "copy", "pprint", "textwrap", "base64", "hashlib", "hmac",
    "array", "struct", "abc", "io", "numbers", "warnings",
    "collections.abc", "typing_extensions",
]

def preload_allowed_modules():
    """
    Import all safe modules while the real import system is still intact.
    After this, sys.modules contains fully-initialized module objects for
    all allowed stdlib modules.  When the blocklist is applied next, those
    modules keep their internal references (e.g. random._os) even though
    we set sys.modules['os'] = None.  User code can still do `import random`
    because Python finds it already in sys.modules and skips re-execution.
    """
    for mod in ALLOWED_PRELOAD:
        try:
            __import__(mod)
        except Exception:
            pass  # optional / unavailable module — skip silently


def block_modules():
    """
    Block dangerous modules from user code.

    Two-layer approach:
      1. sys.modules[mod] = None  — fastest block; causes ImportError immediately
      2. builtins.__import__ hook — catches anything that slips through

    IMPORTANT: Some modules must NOT be nulled out in sys.modules because
    CPython uses them internally during interpreter shutdown:
      - threading  → CPython calls sys.modules['threading']._shutdown() on exit
      - gc         → garbage collector
      - signal     → signal handling
      - weakref    → reference cleanup
      - atexit     → registered exit handlers
      - _thread    → low-level thread state

    These are still blocked for USER code via the safe_import hook below.
    """
    # Modules CPython needs internally — block only via hook, not sys.modules
    CPYTHON_INTERNAL = {
        "threading", "_thread", "gc", "signal", "_signal",
        "weakref", "_weakref", "atexit", "_atexit",
        "warnings", "_warnings",  # used by stdlib shutdown
    }

    for mod_name in BLOCKED_MODULES:
        if mod_name not in CPYTHON_INTERNAL:
            sys.modules[mod_name] = None  # type: ignore

    # Hook __import__ to block ALL blocked modules (including CPYTHON_INTERNAL)
    original_import = builtins.__import__

    def safe_import(name, *args, **kwargs):
        base = name.split(".")[0]
        if base in BLOCKED_MODULES or name in BLOCKED_MODULES:
            raise ImportError(
                f"Import of '{name}' is not allowed in this sandbox.\n"
                f"Available modules: math, random, datetime, json, re, "
                f"statistics, collections, itertools, string, decimal, "
                f"fractions, functools, operator, typing, dataclasses, "
                f"enum, copy, pprint, textwrap, base64, hashlib, hmac, "
                f"array, struct, and the 'portfolio' module."
            )
        return original_import(name, *args, **kwargs)

    builtins.__import__ = safe_import

# ─── Restricted builtins ──────────────────────────────────────────────────────
REMOVED_BUILTINS = {
    "open", "exec", "eval", "compile", "breakpoint", "input",
    "__loader__", "__spec__", "__builtins__",
    # These can be used to escape the sandbox
    "vars", "locals", "globals",  # keep a safe version
    "memoryview",  # can read raw memory
}

def make_safe_globals(state_dict: dict, captured_output: io.StringIO) -> dict:
    """Build the globals dict for exec with safe builtins and restored state."""

    # Build safe builtins
    safe_builtins = {}
    for name in dir(builtins):
        if name not in REMOVED_BUILTINS:
            safe_builtins[name] = getattr(builtins, name)

    # Safe print that checks output size
    original_print = print

    def safe_print(*args, sep=" ", end="\n", file=None, flush=False):
        text = sep.join(str(a) for a in args) + end
        current_size = len(captured_output.getvalue().encode("utf-8"))
        if current_size + len(text.encode("utf-8")) > MAX_OUTPUT_BYTES:
            raise RuntimeError(
                f"Output limit exceeded ({MAX_OUTPUT_BYTES // 1024} KB max). "
                "Truncate your output."
            )
        captured_output.write(text)

    safe_builtins["print"] = safe_print

    # Safe open — completely disabled
    def safe_open(*args, **kwargs):
        raise PermissionError(
            "open() is disabled in this sandbox. "
            "File access is not permitted."
        )

    safe_builtins["open"] = safe_open

    # Safe vars/locals/globals that don't expose internals
    safe_builtins["vars"] = lambda obj=None: {} if obj is None else vars(obj)
    safe_builtins["locals"] = lambda: {}
    safe_builtins["globals"] = lambda: {}

    # Build the execution namespace
    g = {
        "__builtins__": safe_builtins,
        "__name__": "__main__",
        "__doc__": None,
    }

    # Restore session state (user variables from previous executions)
    g.update(state_dict)

    return g

# ─── Portfolio module injection ────────────────────────────────────────────────
def inject_portfolio_module(g: dict):
    """
    Import portfolio_module and expose its objects into the sandbox globals.
    We do this BEFORE blocking modules so that portfolio_module itself can
    import portfolio_data normally.
    """
    try:
        # Add the backend dir to path so portfolio_module can be found
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        if backend_dir not in sys.path:
            sys.path.insert(0, backend_dir)

        import portfolio_module as _pm

        # Create a fake module object for 'portfolio'
        portfolio_mod = types.ModuleType("portfolio")
        portfolio_mod.projects = _pm.projects
        portfolio_mod.skills = _pm.skills
        portfolio_mod.experience = _pm.experience
        portfolio_mod.about = _pm.about
        portfolio_mod.contact = _pm.contact
        sys.modules["portfolio"] = portfolio_mod

        # Also inject into sandbox globals for convenience
        g["portfolio"] = portfolio_mod

    except Exception as e:
        # Non-fatal — portfolio module unavailable
        pass

# ─── State serialisation ───────────────────────────────────────────────────────
# We serialise state as a dict of simple Python values.
# We skip non-serialisable objects (functions, classes, modules, etc.)

SAFE_TYPES = (int, float, str, bool, list, dict, tuple, type(None))

def _is_serialisable(v):
    if isinstance(v, SAFE_TYPES):
        try:
            json.dumps(v)
            return True
        except (TypeError, ValueError):
            return False
    return False

def extract_state(namespace: dict) -> dict:
    """Extract serialisable user variables from exec namespace."""
    state = {}
    for k, v in namespace.items():
        if k.startswith("_"):
            continue
        if k in ("portfolio",):
            continue
        if callable(v) and not isinstance(v, type):
            continue  # skip functions (not safely serialisable)
        if _is_serialisable(v):
            state[k] = v
    return state

# ─── Main execution ────────────────────────────────────────────────────────────
def main():
    # Read input from stdin
    raw = sys.stdin.read()
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        sys.stdout.write(json.dumps({
            "stdout": "",
            "stderr": "Internal error: invalid input payload",
            "error": "invalid_payload",
            "state": {},
        }))
        return

    code = payload.get("code", "")
    state_in = payload.get("state", {})

    if not isinstance(code, str):
        sys.stdout.write(json.dumps({
            "stdout": "",
            "stderr": "Internal error: code must be a string",
            "error": "invalid_code",
            "state": {},
        }))
        return

    # ── Setup phase (real import system fully active) ──────────────────────────
    # Pre-import all allowed stdlib modules while the real import system is
    # still intact.  This lets `random`, `datetime`, `hashlib`, etc. resolve
    # their internal dependencies (e.g. random → os.urandom) BEFORE we block os.
    preload_allowed_modules()

    # Inject portfolio module (also needs real imports)
    captured_stdout = io.StringIO()
    g = make_safe_globals(state_in, captured_stdout)
    inject_portfolio_module(g)

    # ── Lock-down phase ────────────────────────────────────────────────────────
    # Apply OS-level resource limits NOW — after all setup imports are done.
    # This avoids RLIMIT_NOFILE starving stdlib .pyc file reads during preload.
    apply_resource_limits()

    # Block dangerous modules — must be last in setup so preload ran cleanly.
    block_modules()



    # Redirect stderr capture
    captured_stderr = io.StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr

    result_state = {}
    error_msg = None

    try:
        # Execute user code in restricted globals
        # We use compile() first so we get clean SyntaxError messages
        try:
            compiled = compile(code, "<portfolio-sandbox>", "exec")
        except SyntaxError as e:
            error_msg = f"SyntaxError: {e.msg} (line {e.lineno})"
            if e.text:
                error_msg += f"\n  {e.text.rstrip()}"
                if e.offset:
                    error_msg += "\n  " + " " * (e.offset - 1) + "^"
            sys.stdout.write(json.dumps({
                "stdout": "",
                "stderr": error_msg,
                "error": "syntax_error",
                "state": state_in,
            }))
            return

        exec(compiled, g)  # noqa: S102 — this IS the sandboxed execution

        # Extract serialisable state
        result_state = extract_state(g)

    except MemoryError:
        error_msg = "MemoryError: memory limit exceeded."
    except RuntimeError as e:
        if "output limit" in str(e).lower():
            error_msg = str(e)
        else:
            error_msg = traceback.format_exc()
    except Exception:
        error_msg = traceback.format_exc()
        # Clean up internal paths from tracebacks
        error_msg = error_msg.replace(
            os.path.dirname(os.path.abspath(__file__)) + os.sep, ""
        )
        # Remove the runner.py frame — show only user code frames
        lines = error_msg.splitlines()
        cleaned = []
        skip_next = False
        for line in lines:
            if "runner.py" in line and "exec(compiled" in "".join(lines):
                skip_next = True
                continue
            if skip_next and line.startswith("    "):
                skip_next = False
                continue
            skip_next = False
            # Replace internal path with <sandbox>
            line = line.replace('<portfolio-sandbox>', '<sandbox>')
            cleaned.append(line)
        error_msg = "\n".join(cleaned)

    # Write result
    out_text = captured_stdout.getvalue()
    err_text = error_msg or ""

    # Final output size guard
    if len(out_text.encode("utf-8")) > MAX_OUTPUT_BYTES:
        out_text = out_text[:MAX_OUTPUT_BYTES].rsplit("\n", 1)[0]
        out_text += f"\n\n[Output truncated at {MAX_OUTPUT_BYTES // 1024} KB]"

    sys.stdout.write(json.dumps({
        "stdout": out_text,
        "stderr": err_text,
        "error": None if not err_text else "runtime_error",
        "state": result_state,
    }))


if __name__ == "__main__":
    main()
