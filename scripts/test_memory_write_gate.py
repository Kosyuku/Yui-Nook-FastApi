"""Small regression tests for automatic-memory admission rules."""
from __future__ import annotations

import unittest

from consciousness.memory_filter import should_store_memory


class MemoryWriteGateTests(unittest.TestCase):
    def test_repeated_unanswered_app_activity_is_rejected(self) -> None:
        ok, reason = should_store_memory(
            "当前角色连续八次打开小红书，对方未回应，需关注对方对重复操作的反应",
            tag="moment",
            source="extraction",
        )
        self.assertFalse(ok)
        self.assertEqual(reason, "transient_activity_observation")

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
