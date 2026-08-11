# Dipanshu Portfolio

A developer portfolio featuring:
- **Real Python execution** via a sandboxed FastAPI backend
- **Simulated Linux terminal** (client-side JavaScript, no server access)
- One-page HTML portfolio with dark developer aesthetic

---

## Architecture

```
Browser
  └─ GET  /                       → serves portfolio.html (FastAPI)
  └─ POST /api/python/execute     → sandboxed Python execution
              ↓
         FastAPI (main.py) — NEVER runs user code
              ↓
         subprocess.run(runner.py) — isolated process
              ↓
         Real Python interpreter (restricted builtins + module blocklist)
              ↓
         stdout / stderr → JSON → browser

Linux terminal:  100% client-side JavaScript (no server involvement)
```

---

## Quick Start (Local Development)

### Requirements
- Python 3.11+ (3.12 recommended)

### Setup

```bash
# 1. Clone / copy the project
cd dipanshu_portfolio

# 2. Install backend dependencies
pip install -r backend/requirements.txt

# 3. Copy env config
cp .env.example .env

# 4. Start the server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

# 5. Open browser
open http://localhost:8000
```

---

## Docker Deployment

```bash
# Build and run
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The container is limited to 256 MB RAM and 0.5 CPU (configurable in `docker-compose.yml`).

---

## Manual Security Tests

Run these after starting the server to verify sandbox behaviour:

```bash
BASE="http://localhost:8000"

# 1. Basic Python — must print hello
curl -s -X POST $BASE/api/python/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"print(\"hello\")"}' | python3 -m json.tool

# 2. Arithmetic
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"x = 10\ny = 20\nprint(x + y)"}' | python3 -m json.tool

# 3. Portfolio module
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"from portfolio import projects\nprojects.list()"}' | python3 -m json.tool

# 4. SECURITY: os import — must return ImportError
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"import os\nprint(os.listdir(\"/\"))"}' | python3 -m json.tool

# 5. SECURITY: subprocess — must return ImportError
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"import subprocess\nsubprocess.run([\"id\"])"}' | python3 -m json.tool

# 6. SECURITY: socket — must return ImportError
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"import socket\nsocket.create_connection((\"example.com\", 80))"}' | python3 -m json.tool

# 7. SECURITY: file read — must return PermissionError
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"open(\"/etc/passwd\").read()"}' | python3 -m json.tool

# 8. SECURITY: infinite loop — must time out after 5 seconds
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"while True: pass"}' | python3 -m json.tool

# 9. SECURITY: memory bomb — must error
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"x = [0] * 1000000000"}' | python3 -m json.tool

# 10. SECURITY: output bomb — must truncate
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"while True: print(\"A\" * 1000)"}' | python3 -m json.tool

# 11. Real Python error — must show actual error, not "unrecognized command"
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"print(undefined_variable)"}' | python3 -m json.tool

# 12. Division by zero
curl -s -X POST $BASE/api/python/execute \
  -d '{"code":"print(1/0)"}' | python3 -m json.tool
```

---

## Sandbox Limits

| Limit | Default | Env var |
|-------|---------|---------|
| Execution time | 5 seconds | `MAX_EXECUTION_TIME` |
| Memory | 128 MB | `MAX_MEMORY_MB` |
| Output | 64 KB | `MAX_OUTPUT_KB` |
| Code size | 32 KB | `MAX_CODE_SIZE_KB` |
| Concurrent runs | 1 | `MAX_CONCURRENT_EXECUTIONS` |
| Session TTL | 5 min | `PYTHON_SESSION_TIMEOUT_MINUTES` |

---

## Allowed Python Modules

Standard library only. Allowed includes:
`math`, `random`, `datetime`, `json`, `re`, `statistics`, `collections`,
`itertools`, `string`, `decimal`, `fractions`, `functools`, `operator`,
`typing`, `dataclasses`, `enum`, `copy`, `pprint`, `textwrap`,
`base64`, `hashlib`, `hmac`, `array`

Custom module: `portfolio` (projects, skills, experience, about, contact)

Blocked: `os`, `subprocess`, `socket`, `ctypes`, `multiprocessing`, `pty`,
`urllib`, `http`, `shutil`, `pathlib`, `importlib`, `pip`, and many more.

---

## File Structure

```
dipanshu_portfolio/
├── portfolio.html              ← Single-page portfolio (frontend)
├── backend/
│   ├── main.py                 ← FastAPI app + /api/python/execute
│   ├── runner.py               ← Isolated execution subprocess
│   ├── portfolio_module.py     ← portfolio Python module
│   ├── portfolio_data.py       ← Single source of truth (all project data)
│   ├── session_manager.py      ← Variable persistence with TTL
│   └── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Linux Terminal

The Linux terminal is **100% client-side JavaScript**. It simulates a filesystem
at `/workspace` with the portfolio content. No commands are ever sent to the server.

Supported commands: `ls`, `pwd`, `cd`, `cat`, `tree`, `head`, `tail`, `wc`,
`grep`, `find`, `sort`, `uniq`, `echo`, `printf`, `mkdir`, `touch`, `cp`,
`mv`, `rm`, `whoami`, `date`, `uname`, `free`, `df`, `history`, `clear`, `help`

Pipe support: `ls | grep qr`
Redirection: `echo hello > test.txt`
Tab completion: Tab key
History: Up/Down arrows
Clear: Ctrl+L
