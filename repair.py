import sys
import io

fixes = {
    1: '"""SQLite database layer - Sessions + Messages"""',
    41: "    title       TEXT NOT NULL DEFAULT 'new session',",
    123: '-- ========== new tables ==========',
    364: '        return "current persona record"',
    366: '        return f"{owner} processed / source {source_agent}"',
    367: '        return f"{owner} record"',
    512: '        # consciousness snapshot\n        "open_loops_summary": "",',
    546: '    # -- consciousness snapshot cols --',
    595: '        return "my notebook"',
    596: '        return f"{normalized_id} notebook"',
    1608: '        # -- consciousness snapshot cols (v1) --',
    1622: '        # -- proactive_messages new cols (v1) --',
    1822: '        # session source flag',
    1965: '# ==================== Sessions ====================',
    2062: '# ==================== Messages ====================',
    2086: '    # update session time',
    2110: '    """Get top N messages in OpenAI format"""',
    2346: '# ==================== Semantic Memory ====================',
    2558: '    """Keyword search memories"""',
    2757: '    """Get memory count per category"""',
    2769: '# ==================== Amber Labels ====================',
    2772: '    """List memory labels with count"""',
    2913: '    """Global stats: agent links + memories + categories + labels"""',
    2920: '        # Mem stats logic\n        by_category = await _supabase_get_memory_stats(all_agents=True)',
    2923: '        # Per-agent links stats',
    2949: '        # Label stats',
    2960: '    # SQLite path',
    3010: '# ==================== Context Summaries ====================',
    3058: '        role_cn = "user" if role == "user" else "AI"',
    3063: '    return "Session summary:\\n" + "\\n".join(lines)',
    3072: '    """Generate incremental summary for long session"""',
    3113: '# ==================== Todos ====================',
    3179: '# ==================== Notes ====================',
    3961: '# ==================== Proactive Messages ====================',
    4014: '    """Get last proactive message generation time"""',
    4069: '    """Count today proactive messages"""',
    4089: '# ==================== Memory Logs ====================',
    4110: '# ==================== Historical Messages ====================',
    4113: '    """Get messages by date (YYYY-MM-DD)"""',
    4144: '    """Get recent user activity time"""',
}

lines = []
with open('database.py', 'rb') as f:
    for line in f:
        # Decode using replace, so we don't crash. We only lose data on broken lines anyway.
        text = line.decode('utf-8', errors='replace').rstrip('\r\n')
        lines.append(text)

# Apply fixes based on exact line numbers
for line_num, replacement in fixes.items():
    idx = line_num - 1
    if idx < len(lines):
        lines[idx] = replacement

# Write back as valid UTF-8
with open('database.py', 'w', encoding='utf-8') as f:
    for line in lines:
        f.write(line + '\n')

print("Repair completed!")
