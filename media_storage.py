"""Cloudflare R2 media object helper."""
from __future__ import annotations

import re
import uuid
from pathlib import PurePath

from config import settings

MEDIA_TYPE_PREFIXES = {
    "book": "books",
    "music": "music",
    "image": "images",
    "cover": "covers",
    "other": "other",
}

MEDIA_OWNER_TYPES = {"user", "global", "agent"}


def normalize_media_type(value: str | None) -> str:
    media_type = str(value or "other").strip().lower()
    return media_type if media_type in MEDIA_TYPE_PREFIXES else "other"


def normalize_owner_type(value: str | None) -> str:
    owner_type = str(value or "user").strip().lower()
    return owner_type if owner_type in MEDIA_OWNER_TYPES else "user"


def sanitize_filename(filename: str | None) -> str:
    name = PurePath(str(filename or "")).name.strip()
    if not name or name in {".", ".."}:
        name = "file.bin"
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[^A-Za-z0-9._-]", "_", name)
    name = name.strip("._-") or "file.bin"
    return name[:160]


def build_storage_key(
    media_type: str | None,
    agent_id: str | None,
    filename: str | None,
    *,
    owner_type: str | None = "user",
) -> str:
    prefix = MEDIA_TYPE_PREFIXES[normalize_media_type(media_type)]
    owner = normalize_owner_type(owner_type)
    owner_segment = "global" if owner == "global" else "user"
    if owner == "agent":
        owner_segment = str(agent_id or "").strip()
        if not owner_segment:
            raise ValueError("agent_id is required when owner_type='agent'")
    safe_name = sanitize_filename(filename)
    return f"{prefix}/{owner_segment}/{uuid.uuid4().hex}_{safe_name}"


class R2Client:
    def __init__(self) -> None:
        self._client = None

    def _ensure_configured(self) -> None:
        if settings.media_storage_provider != "r2":
            raise RuntimeError(f"Unsupported media storage provider: {settings.media_storage_provider}")
        missing = [
            name
            for name, value in {
                "R2_ACCESS_KEY_ID": settings.r2_access_key_id,
                "R2_SECRET_ACCESS_KEY": settings.r2_secret_access_key,
                "R2_BUCKET": settings.r2_bucket,
            }.items()
            if not value
        ]
        if not (settings.r2_endpoint or settings.r2_account_id):
            missing.append("R2_ENDPOINT or R2_ACCOUNT_ID")
        if missing:
            raise RuntimeError(f"R2 media storage is not configured: {', '.join(missing)}")

    def client(self):
        self._ensure_configured()
        if self._client is None:
            try:
                import boto3
                from botocore.config import Config
            except Exception as exc:
                raise RuntimeError("boto3 is required for R2 media storage") from exc
            endpoint_url = settings.r2_endpoint or f"https://{settings.r2_account_id}.r2.cloudflarestorage.com"
            self._client = boto3.client(
                "s3",
                endpoint_url=endpoint_url,
                aws_access_key_id=settings.r2_access_key_id,
                aws_secret_access_key=settings.r2_secret_access_key,
                region_name=settings.r2_region or "auto",
                config=Config(signature_version="s3v4"),
            )
        return self._client

    def presigned_upload_url(
        self,
        storage_key: str,
        *,
        mime_type: str = "application/octet-stream",
        expires_seconds: int | None = None,
    ) -> str:
        params = {"Bucket": settings.r2_bucket, "Key": storage_key}
        if mime_type:
            params["ContentType"] = mime_type
        return self.client().generate_presigned_url(
            "put_object",
            Params=params,
            ExpiresIn=expires_seconds or settings.r2_presign_expires_seconds,
            HttpMethod="PUT",
        )

    def presigned_download_url(self, storage_key: str, *, expires_seconds: int | None = None) -> str:
        return self.client().generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.r2_bucket, "Key": storage_key},
            ExpiresIn=expires_seconds or settings.r2_presign_expires_seconds,
            HttpMethod="GET",
        )

    def put_object(
        self,
        storage_key: str,
        data: bytes,
        *,
        mime_type: str = "application/octet-stream",
    ) -> None:
        self.client().put_object(
            Bucket=settings.r2_bucket,
            Key=storage_key,
            Body=data,
            ContentType=mime_type or "application/octet-stream",
        )

    def delete_object(self, storage_key: str) -> None:
        self.client().delete_object(Bucket=settings.r2_bucket, Key=storage_key)


r2_client = R2Client()
