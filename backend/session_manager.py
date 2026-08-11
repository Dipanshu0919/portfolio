"""
session_manager.py — Stateful Python session with TTL.

Stores user variable state (simple JSON-serialisable values) so that
variables set in one execution persist into the next, up to SESSION_TIMEOUT.

One global session only.  State is kept in memory (dict) — no files.
Thread-safe via asyncio.Lock (called from FastAPI async context).
"""

import asyncio
import time
import json
import os

SESSION_TIMEOUT_SECONDS = int(os.environ.get("PYTHON_SESSION_TIMEOUT_MINUTES", "5")) * 60


class SessionManager:
    def __init__(self):
        self._lock = asyncio.Lock()
        self._state: dict = {}
        self._last_used: float = 0.0
        self._created_at: float = 0.0

    async def get_state(self) -> dict:
        """Return current session state, resetting if TTL expired."""
        async with self._lock:
            now = time.time()
            if self._last_used > 0 and (now - self._last_used) > SESSION_TIMEOUT_SECONDS:
                self._reset()
            return dict(self._state)

    async def save_state(self, new_state: dict):
        """Update session state after a successful execution."""
        async with self._lock:
            self._state = dict(new_state)
            self._last_used = time.time()
            if self._created_at == 0:
                self._created_at = self._last_used

    async def reset(self):
        """Manually reset session."""
        async with self._lock:
            self._reset()

    def _reset(self):
        self._state = {}
        self._last_used = 0.0
        self._created_at = 0.0

    async def status(self) -> dict:
        """Return session status info (no sensitive data)."""
        async with self._lock:
            now = time.time()
            if self._last_used == 0:
                return {"active": False, "expires_in_seconds": None, "variable_count": 0}
            elapsed = now - self._last_used
            remaining = max(0, SESSION_TIMEOUT_SECONDS - elapsed)
            expired = remaining == 0
            if expired:
                self._reset()
                return {"active": False, "expires_in_seconds": None, "variable_count": 0}
            return {
                "active": True,
                "expires_in_seconds": int(remaining),
                "variable_count": len(self._state),
            }


# Singleton
session_manager = SessionManager()
