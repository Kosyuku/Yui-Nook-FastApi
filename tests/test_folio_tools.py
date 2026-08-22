import json
import os
import tempfile
import unittest
from unittest.mock import AsyncMock, patch

import yui_tool_bridge as bridge
import mcp_server
import database as db
from tools import execute_tool_with_guard
from yui_app_tool_registry import APP_TOOL_ALIASES


FOLIO_BOOK = {
    "id": "book-1",
    "type": "book",
    "title": "A Test Book",
    "author": "YUI",
    "storage_key": "folio/private/book-1.txt",
    "mime_type": "text/plain; charset=utf-8",
    "size_bytes": 10,
    "metadata": {
        "source": "folio",
        "language": "en",
        "description": "Test fixture",
    },
    "created_at": "2026-08-22T00:00:00Z",
    "updated_at": "2026-08-22T00:00:00Z",
}


class FolioToolTests(unittest.IsolatedAsyncioTestCase):
    async def test_bookshelf_lists_only_public_metadata(self):
        list_media_items = AsyncMock(return_value=[FOLIO_BOOK])
        with patch.object(bridge.db, "list_media_items", list_media_items):
            result = json.loads(await bridge.list_folio_books(limit=10, offset=2))

        list_media_items.assert_awaited_once_with(
            type="book",
            metadata_source="folio",
            limit=10,
            offset=2,
        )
        self.assertTrue(result["success"])
        self.assertEqual(result["books"][0]["id"], "book-1")
        self.assertNotIn("storage_key", json.dumps(result))

    async def test_read_book_uses_private_key_and_returns_a_page(self):
        get_media_item = AsyncMock(return_value=FOLIO_BOOK)
        with (
            patch.object(bridge.db, "get_media_item", get_media_item),
            patch.object(bridge.media_storage.r2_client, "get_object_bytes", return_value=b"0123456789") as get_object,
        ):
            result = json.loads(await bridge.read_folio_book("book-1", offset=3, limit=4))

        get_media_item.assert_awaited_once_with("book-1")
        get_object.assert_called_once_with("folio/private/book-1.txt")
        self.assertTrue(result["success"])
        self.assertEqual(result["content"], "3456")
        self.assertEqual(result["next_offset"], 7)
        self.assertTrue(result["has_more"])
        self.assertNotIn("storage_key", json.dumps(result))

    async def test_read_rejects_non_folio_media_before_r2(self):
        other_book = {**FOLIO_BOOK, "metadata": {"source": "media"}}
        with (
            patch.object(bridge.db, "get_media_item", AsyncMock(return_value=other_book)),
            patch.object(bridge.media_storage.r2_client, "get_object_bytes") as get_object,
        ):
            result = json.loads(await bridge.read_folio_book("book-1"))

        self.assertFalse(result["success"])
        self.assertEqual(result["error"], "Folio book not found")
        get_object.assert_not_called()

    async def test_mcp_bookshelf_then_read_book_chain(self):
        with (
            patch.object(bridge.db, "list_media_items", AsyncMock(return_value=[FOLIO_BOOK])),
            patch.object(bridge.db, "get_media_item", AsyncMock(return_value=FOLIO_BOOK)),
            patch.object(bridge.media_storage.r2_client, "get_object_bytes", return_value=b"chapter one"),
        ):
            shelf = json.loads(await mcp_server.folio("list_books", {"limit": 5}))
            page = json.loads(
                await mcp_server.folio(
                    "read_book",
                    {"book_id": shelf["books"][0]["id"], "offset": 0, "limit": 7},
                )
            )

        self.assertTrue(shelf["success"])
        self.assertEqual(page["content"], "chapter")
        self.assertNotIn("storage_key", json.dumps({"shelf": shelf, "page": page}))

    def test_shared_registry_and_folio_dispatch_expose_book_tools(self):
        self.assertIn("list_folio_books", APP_TOOL_ALIASES)
        self.assertIn("read_folio_book", APP_TOOL_ALIASES)
        self.assertIn("list_folio_highlights", APP_TOOL_ALIASES)
        self.assertIn("create_folio_highlight", APP_TOOL_ALIASES)
        self.assertIn("add_folio_thought", APP_TOOL_ALIASES)
        self.assertIn("reply_folio_thought", APP_TOOL_ALIASES)
        self.assertIn("read_folio_shared_context", APP_TOOL_ALIASES)
        self.assertIn("update_folio_reading_position", APP_TOOL_ALIASES)
        self.assertIs(bridge._FOLIO_ACTIONS["list_books"], bridge.list_folio_books)
        self.assertIs(bridge._FOLIO_ACTIONS["read_book"], bridge.read_folio_book)
        self.assertIs(mcp_server._FOLIO_ACTIONS["list_books"], bridge.list_folio_books)
        self.assertIs(mcp_server._FOLIO_ACTIONS["read_book"], bridge.read_folio_book)
        self.assertFalse(hasattr(bridge, "_folio_media_book_as_item"))

    async def test_agent_write_tools_force_agent_identity(self):
        create_highlight = AsyncMock(return_value={"id": "h1", "authorType": "agent"})
        with patch.object(bridge.db, "create_folio_highlight", create_highlight):
            result = json.loads(await bridge.create_folio_highlight("book-1", 0, 1, 3, "bc", "azul"))
        self.assertTrue(result["success"])
        self.assertEqual(create_highlight.await_args.kwargs["author_type"], "agent")
        self.assertEqual(create_highlight.await_args.kwargs["author_id"], "azul")

    async def test_chat_guard_overrides_model_supplied_agent_id(self):
        create_highlight = AsyncMock(return_value={"id": "h1", "authorType": "agent"})
        with patch.object(bridge.db, "create_folio_highlight", create_highlight):
            result = json.loads(await execute_tool_with_guard(
                "create_folio_highlight",
                {
                    "book_id": "book-1",
                    "chapter_index": 0,
                    "start_offset": 0,
                    "end_offset": 2,
                    "text": "ok",
                    "agent_id": "spoofed",
                },
                trusted_agent_id="azul",
            ))
        self.assertTrue(result["success"])
        self.assertEqual(create_highlight.await_args.kwargs["author_id"], "azul")


class FolioPersistenceTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        await db.close_db()
        fd, self.db_path = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        self.previous_backend = db.settings.database_backend
        self.previous_path = db.settings.database_path
        db.settings.database_backend = "sqlite"
        db.settings.database_path = self.db_path

    async def asyncTearDown(self):
        await db.close_db()
        db.settings.database_backend = self.previous_backend
        db.settings.database_path = self.previous_path
        try:
            os.remove(self.db_path)
        except FileNotFoundError:
            pass

    async def _create_book(self):
        return await db.create_media_item(
            type="book",
            title="Shared Book",
            storage_key="folio/private/shared.txt",
            mime_type="text/plain",
            metadata={"source": "folio"},
        )

    async def test_nested_annotations_and_independent_positions(self):
        book = await self._create_book()
        highlight = await db.create_folio_highlight(
            book["id"], chapter_index=2, start_offset=4, end_offset=8, quote_text="test",
            author_type="user", author_id="spoofed", author_name="",
        )
        thought = await db.add_folio_thought(
            highlight["id"], content="my note", author_type="user", author_id="spoofed",
        )
        await db.add_folio_comment(
            thought["id"], content="my reply", author_type="user", author_id="spoofed",
        )

        nested = await db.list_folio_highlights(book["id"], chapter_index=2)
        self.assertEqual(nested[0]["authorId"], "user")
        self.assertEqual(nested[0]["thoughts"][0]["comments"][0]["content"], "my reply")

        await db.set_folio_reading_position(book["id"], actor_type="user", actor_id="spoofed", chapter_index=2)
        await db.set_folio_reading_position(book["id"], actor_type="agent", actor_id="azheng", chapter_index=5)
        user_position = await db.get_folio_reading_position(book["id"], actor_type="user", actor_id="anything")
        agent_position = await db.get_folio_reading_position(book["id"], actor_type="agent", actor_id="azheng")
        self.assertEqual(user_position["chapterIndex"], 2)
        self.assertEqual(agent_position["chapterIndex"], 5)

    async def test_non_folio_book_rejects_annotations(self):
        book = await db.create_media_item(
            type="book",
            title="Other Book",
            storage_key="media/private/other.txt",
            metadata={"source": "media"},
        )
        with self.assertRaisesRegex(ValueError, "Folio book not found"):
            await db.create_folio_highlight(
                book["id"], chapter_index=0, start_offset=0, end_offset=2, quote_text="no",
                author_type="user", author_id="user",
            )


if __name__ == "__main__":
    unittest.main()
