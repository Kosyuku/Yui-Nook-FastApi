"""Small regression tests for automatic-memory admission rules."""
from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from consciousness.memory_filter import should_store_memory  # noqa: E402


class MemoryWriteGateTests(unittest.TestCase):
    def test_repeated_unanswered_app_activity_is_rejected(self) -> None:
        ok, reason = should_store_memory(
            "当前角色连续八次打开小红书，对方未回应，需关注对方对重复操作的反应",
            tag="moment",
            source="extraction",
        )
        self.assertFalse(ok)
        self.assertEqual(reason, "transient_activity_observation")

    def test_storage_narration_with_filler_prefix_is_rejected(self) -> None:
        # 模型几乎总会带「好的，」前缀，行首锚定的 _META_PATTERNS 抓不到。
        ok, reason = should_store_memory(
            "好的，我来记录这条关于你喜好的信息。",
            tag="core_profile",
            source="agent_tool",
        )
        self.assertFalse(ok)
        self.assertEqual(reason, "storage_narration")

    def test_storage_narration_in_trailing_clause_is_rejected(self) -> None:
        ok, reason = should_store_memory(
            "小酒真是细心又靠谱！她主动指出工具列表合并的问题，帮助排查。让我把这件事记下来。",
            tag="core_profile",
            source="agent_tool",
        )
        self.assertFalse(ok)
        self.assertEqual(reason, "storage_narration")

    def test_preference_about_being_remembered_is_not_storage_narration(self) -> None:
        # 防误伤：内容本身在讲「希望被记住」，是真事实，不是存储旁白。
        ok, reason = should_store_memory(
            "她希望重要的事情都能被记住，讨厌反复解释同一件事。",
            tag="stance",
            source="extraction",
        )
        self.assertTrue(ok)
        self.assertEqual(reason, "ok")

    def test_durable_preference_can_be_staged(self) -> None:
        ok, reason = should_store_memory(
            "她明确表示不喜欢被频繁追问进度，希望先自己整理思路后再讨论。",
            tag="stance",
            source="extraction",
        )
        self.assertTrue(ok)
        self.assertEqual(reason, "ok")


if __name__ == "__main__":
    unittest.main()
