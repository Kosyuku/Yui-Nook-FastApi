from __future__ import annotations

import getpass
import hashlib
import secrets
import sys


def make_hash(password: str, *, iterations: int = 600_000) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        iterations,
    ).hex()
    return f"pbkdf2_sha256${iterations}${salt}${digest}"


if __name__ == "__main__":
    password = sys.argv[1] if len(sys.argv) > 1 else getpass.getpass("Password: ")
    print(make_hash(password))
