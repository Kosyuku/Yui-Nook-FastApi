from __future__ import annotations

import json
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from config import settings
from models import OpenAICompatAdapter, _join_base_url_and_path, _validate_provider_config


def safe_provider_debug() -> dict:
    base_url = settings.chat.base_url.rstrip("/")
    api_path = settings.chat.api_path
    final_url = _join_base_url_and_path(base_url, api_path)
    return {
        "provider": settings.chat.name,
        "base_url": base_url,
        "api_path": api_path,
        "model": settings.chat.model,
        "final_request_url": final_url,
        "adapter_class": OpenAICompatAdapter.__name__,
        "config_error": _validate_provider_config(
            provider=settings.chat.name,
            base_url=base_url,
            model=settings.chat.model,
            final_url=final_url,
        ),
    }


def main() -> None:
    print(json.dumps(safe_provider_debug(), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
