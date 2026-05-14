import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./FolioApp.css";
import "./folio-shelf-fix.css";
import { listMediaItems, mediaUploadProvider, uploadMediaFile, withMediaUrls } from "./mediaApi.js";

// ── Utilities ─────────────────────────────────────────────
function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function formatDate(iso) {
  if (!iso) return "";
  try { const d = new Date(iso); return `${d.getMonth() + 1}月${d.getDate()}日`; }
  catch { return ""; }
}

// ── Morandian cover palettes (by hash of title) ────────────
const COVER_PALETTES = [
  { from: "#bec8c4", to: "#a8b8b4", accent: "#9aafa8" },  // 雾霭绿灰
  { from: "#c4b8cc", to: "#b0a4bc", accent: "#a090b0" },  // 薄雾紫
  { from: "#cac0b8", to: "#b8aca4", accent: "#a89890" },  // 暖沙棕
  { from: "#b4bec8", to: "#a0aab8", accent: "#8c98a8" },  // 烟蓝灰
  { from: "#c8bcbc", to: "#b8a8a8", accent: "#a89494" },  // 胭脂灰粉
  { from: "#bcc4b0", to: "#acb4a0", accent: "#98a48c" },  // 烟草绿
  { from: "#c4c0b4", to: "#b4b0a4", accent: "#a4a094" },  // 米草灰
  { from: "#c0b8c8", to: "#aea8b8", accent: "#9c94a8" },  // 烟熏丁香
];
function coverPalette(title = "") {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) & 0xffffffff;
  return COVER_PALETTES[Math.abs(hash) % COVER_PALETTES.length];
}

const READING_PREFS_KEY = "folio_reading_prefs_v1";
const DEFAULT_READING_PREFS = {
  fontSize: 16,
  lineHeight: 2,
  background: "#faf8f5",
  mode: "scroll",
};

function loadReadingPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(READING_PREFS_KEY) || "null");
    return { ...DEFAULT_READING_PREFS, ...(saved || {}) };
  } catch {
    return DEFAULT_READING_PREFS;
  }
}

function saveReadingPrefs(prefs) {
  try {
    localStorage.setItem(READING_PREFS_KEY, JSON.stringify(prefs));
  } catch { }
}

// ── Chapter Detection ─────────────────────────────────────
const CHAPTER_STRONG = [
  /^第[一二三四五六七八九十百千零〇0-9]+[章节卷篇话回]/,
  /^Chapter\s*[\dIVXivx]+/i,
  /^[序前后楔](言|记|章|外|幕)/,
  /^(尾声|番外|后记|引子|自序|跋|附录|楔子)/,
];
const CHAPTER_WEAK = [
  /^[一二三四五六七八九十百千零〇]+[、．.。：:\s]\s*\S/,
  /^\d+[、．.。：:\s]\s*\S/,
];

function detectChapters(text) {
  const lines = text.split(/\r?\n/);
  const strongLines = new Set();
  const weakLines = new Set();

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t || t.length > 80) continue;
    if (CHAPTER_STRONG.some(p => p.test(t))) strongLines.add(i);
    else if (CHAPTER_WEAK.some(p => p.test(t))) weakLines.add(i);
  }

  // Heuristic: If we have a healthy amount of STRONG chapters (e.g., > 2),
  // we assume the book uses a standard chapter format and discard WEAK matches 
  // (which are likely false positives like lists or countdowns).
  const useWeak = strongLines.size <= 2;
  const hasStrict = strongLines.size > 0 || (useWeak && weakLines.size > 0);

  const chapters = [];
  let currentTitle = null;
  let currentLines = [];

  const flush = () => {
    const content = currentLines.join("\n").trim();
    if (currentTitle !== null || content) {
      chapters.push({ index: chapters.length, title: currentTitle || "正文", content });
    }
    currentLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let isCh = false;
    
    if (hasStrict) {
      isCh = strongLines.has(i) || (useWeak && weakLines.has(i));
    } else {
      // Soft fallback
      const t = line.trim();
      const prevBlank = i === 0 || !lines[i - 1]?.trim();
      const nextBlank = i === lines.length - 1 || !lines[i + 1]?.trim();
      if (t && t.length >= 2 && t.length <= 40 && prevBlank && nextBlank) {
        isCh = true;
      }
    }

    if (isCh) {
      flush();
      currentTitle = line.trim();
    } else {
      currentLines.push(line);
    }
  }
  flush();

  // If only one chapter and it's too long, auto-split every ~3000 chars at paragraph boundaries
  if (chapters.length === 1 && chapters[0].content.length > 4000) {
    const content = chapters[0].content;
    const paragraphs = content.split(/\r?\n/);
    const split = [];
    let buf = "";
    let partIdx = 1;
    for (const p of paragraphs) {
      if (buf.length + p.length > 3000 && buf) {
        split.push({ index: split.length, title: `第 ${partIdx} 段`, content: buf.trim() });
        partIdx++;
        buf = p;
      } else {
        buf += (buf ? "\n\n" : "") + p;
      }
    }
    if (buf) split.push({ index: split.length, title: `第 ${partIdx} 段`, content: buf.trim() });
    return split.length > 1 ? split : chapters;
  }

  return chapters.length ? chapters : [{ index: 0, title: "正文", content: text.trim() }];
}

function decodeBookBuffer(buffer) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder("gbk").decode(buffer);
  }
}

function getMediaBookTitle(item) {
  const metadata = item?.metadata && typeof item.metadata === "object" ? item.metadata : {};
  const filename = metadata.original_filename || item?.title || "未命名书籍";
  return String(filename).replace(/\.(txt|md|epub|pdf)$/i, "").trim() || "未命名书籍";
}

function buildBookFromMediaItem(item, text) {
  return {
    id: `media-${item.id}`,
    title: getMediaBookTitle(item),
    author: item.author || "",
    categoryId: "未分类",
    isStarred: false,
    addedAt: item.created_at || new Date().toISOString(),
    chapters: detectChapters(text),
    highlights: [],
    mediaItemId: item.id || "",
    storageProvider: item.storage_provider || "",
    storageKey: item.storage_key || "",
  };
}

// ── Text Rendering with Highlights ────────────────────────
function buildSegments(content, highlights) {
  if (!content) return [];
  const sorted = [...highlights].sort((a, b) => a.startOffset - b.startOffset);
  const segs = [];
  let pos = 0;
  for (const h of sorted) {
    if (h.startOffset > pos) segs.push({ type: "text", content: content.slice(pos, h.startOffset), key: `t-${pos}` });
    if (h.endOffset > h.startOffset) segs.push({ type: "highlight", content: content.slice(h.startOffset, h.endOffset), highlight: h, key: `h-${h.id}` });
    pos = Math.max(pos, h.endOffset);
  }
  if (pos < content.length) segs.push({ type: "text", content: content.slice(pos), key: "t-end" });
  return segs;
}

// ── Local Storage ─────────────────────────────────────────
const STORAGE_KEY = "folio_data_v1";
function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return { books: [], ...JSON.parse(r || "{}") }; }
  catch { return { books: [] }; }
}
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }
function clearBrowserSelection() {
  try { window.getSelection()?.removeAllRanges?.(); } catch { }
}

// ── HighlightPanel ────────────────────────────────────────
function HighlightPanel({ highlight, activeActor, agents, onAddThought, onAddComment, onClose }) {
  const [thoughtDraft, setThoughtDraft] = useState("");
  const [commentDraft, setCommentDraft] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [panelError, setPanelError] = useState("");

  function handleAddThought() {
    if (!thoughtDraft.trim()) return;
    try {
      onAddThought(thoughtDraft.trim());
      setThoughtDraft("");
      setPanelError("");
    } catch (error) {
      setPanelError(error?.message || "发布失败，内容先留着。");
    }
  }
  function handleAddComment(thoughtId) {
    if (!commentDraft.trim()) return;
    try {
      onAddComment(thoughtId, commentDraft.trim());
      setCommentDraft(""); setReplyingTo(null);
      setPanelError("");
    } catch (error) {
      setPanelError(error?.message || "回复失败，内容先留着。");
    }
  }

  return (
    <div className="folio-highlight-panel folio-panel-enter">
      <div className="folio-panel-handle" />
      <div className="folio-panel-head">
        <span className="folio-panel-quote">✦ {highlight.text?.slice(0, 50)}{highlight.text?.length > 50 ? "…" : ""}</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="folio-thoughts-list">
        {(!highlight.thoughts || highlight.thoughts.length === 0) && (
          <div style={{ fontSize: 13, color: "rgba(160,140,130,0.6)", textAlign: "center", padding: "20px 0" }}>还没有感想，第一个留下吧</div>
        )}
        {highlight.thoughts?.map((thought) => (
          <div key={thought.id} className="folio-thought-card">
            <div className="folio-thought-head">
              <span className="folio-thought-author">{thought.authorName}</span>
              <time>{formatDate(thought.createdAt)}</time>
            </div>
            <p className="folio-thought-content">{thought.content}</p>
            {thought.comments?.map((c) => (
              <div key={c.id} className="folio-comment-line"><span>{c.authorName}：</span>{c.content}</div>
            ))}
            {replyingTo === thought.id ? (
              <div className="folio-comment-form">
                <input value={commentDraft} onChange={e => setCommentDraft(e.target.value)} placeholder="回复…"
                  onKeyDown={e => { if (e.key === "Enter") handleAddComment(thought.id); }} autoFocus />
                <button onClick={() => handleAddComment(thought.id)}>发</button>
              </div>
            ) : (
              <button className="folio-reply-btn" onClick={() => setReplyingTo(thought.id)}>回复</button>
            )}
          </div>
        ))}
      </div>
      {panelError && <div className="folio-panel-error">{panelError}</div>}
      <div className="folio-thought-form">
        <textarea value={thoughtDraft} onChange={e => setThoughtDraft(e.target.value)} placeholder="写下你的感想…" rows={2} />
        <button className="folio-send-thought" onClick={handleAddThought}>发布</button>
      </div>
    </div>
  );
}

// ── ReadingContent – memoized to avoid lag ─────────────────
function ReadingContent({ content, highlights, onHighlightClick, contentRef, onMouseUp }) {
  const segments = useMemo(() => buildSegments(content, highlights), [content, highlights]);
  return (
    <div
      ref={contentRef}
      className="folio-content"
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      onContextMenu={(event) => event.preventDefault()}
    >
      {segments.map(seg =>
        seg.type === "text"
          ? <span key={seg.key}>{seg.content}</span>
          : <mark key={seg.key} className="folio-highlight" data-has-thoughts={seg.highlight.thoughts?.length > 0}
              onClick={() => onHighlightClick(seg.highlight)}>{seg.content}</mark>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function FolioApp({ onClose, agents = [] }) {
  const [data, setData] = useState(loadData);
  const [view, setView] = useState("shelf");
  const [entering, setEntering] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [activeActor, setActiveActor] = useState("user");
  const [importError, setImportError] = useState("");
  const [importing, setImporting] = useState(false);
  const [migratingToR2, setMigratingToR2] = useState(false);
  const [migrateResult, setMigrateResult] = useState(null); // {done, total, errors}
  const [activeTab, setActiveTab] = useState("全部");
  const [coverMenuOpen, setCoverMenuOpen] = useState(false);
  const [readingPageTop, setReadingPageTop] = useState(0);
  const [readingSettingsOpen, setReadingSettingsOpen] = useState(false);
  const [readingPrefs, setReadingPrefs] = useState(loadReadingPrefs);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const bodyRef = useRef(null);
  const pageInnerRef = useRef(null);
  const readingPointerRef = useRef(null);

  const clearReaderTransientState = useCallback(() => {
    setSelectionInfo(null);
    setActiveHighlight(null);
    readingPointerRef.current = null;
    clearBrowserSelection();
  }, []);

  const openSidebar = useCallback(() => {
    clearReaderTransientState();
    setReadingSettingsOpen(false);
    setSidebarOpen(true);
  }, [clearReaderTransientState]);

  const openReadingSettings = useCallback(() => {
    clearReaderTransientState();
    setSidebarOpen(false);
    setReadingSettingsOpen(true);
  }, [clearReaderTransientState]);

  const openHighlightPanel = useCallback((highlight) => {
    setSidebarOpen(false);
    setReadingSettingsOpen(false);
    setSelectionInfo(null);
    clearBrowserSelection();
    setActiveHighlight(highlight);
  }, []);

  // Categories: "全部" + deduplicated tags from actual books (dynamic)
  const categories = useMemo(() => {
    const tags = new Set();
    (data.books || []).forEach(b => {
      const cat = b.categoryId?.trim();
      if (cat && cat !== "未分类") tags.add(cat);
    });
    return ["全部", "未分类", ...Array.from(tags)];
  }, [data.books]);
  const books = data.books || [];
  const currentBook = books.find(b => b.id === currentBookId) || null;
  const currentChapter = currentBook?.chapters?.[currentChapterIndex] || null;
  const currentHighlights = useMemo(
    () => currentBook?.highlights?.filter(h => h.chapterIndex === currentChapterIndex) || [],
    [currentBook, currentChapterIndex]
  );
  const isPagedMode = readingPrefs.mode === "paged";

  const updateReadingPrefs = useCallback((patch) => {
    setReadingPrefs(prev => {
      const next = { ...prev, ...patch };
      saveReadingPrefs(next);
      return next;
    });
    setReadingPageTop(0);
  }, []);

  // Auto-fix existing books with a single massive chapter (from before the fix)
  useEffect(() => {
    if (data.books?.some(b => b.chapters?.length === 1 && b.chapters[0].content.length > 4000)) {
      updateData(prev => ({
        ...prev,
        books: prev.books.map(b => {
          if (b.chapters?.length === 1 && b.chapters[0].content.length > 4000) {
            return { ...b, chapters: detectChapters(b.chapters[0].content) };
          }
          return b;
        })
      }));
    }
  }, []);

  // animated view transition
  function goToView(nextView) {
    if (nextView !== "reading") {
      clearReaderTransientState();
      setSidebarOpen(false);
      setReadingSettingsOpen(false);
    }
    setEntering(true);
    setView(nextView);
    requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
  }

  useEffect(() => {
    if (!activeHighlight || !currentBook) return;
    const updated = currentBook.highlights?.find(h => h.id === activeHighlight.id);
    if (updated) setActiveHighlight(updated);
  }, [data]);

  // scroll to top when chapter changes
  useEffect(() => {
    setReadingPageTop(0);
    bodyRef.current?.scrollTo({ top: 0, behavior: "auto" });
    clearReaderTransientState();
  }, [currentChapterIndex, clearReaderTransientState]);

  const updateData = useCallback((updater) => {
    setData(prev => { const next = typeof updater === "function" ? updater(prev) : updater; saveData(next); return next; });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restoreBooksFromR2() {
      if (mediaUploadProvider !== "r2") return;
      try {
        const items = await listMediaItems({ type: "book", limit: 200 });
        const linkedItems = await withMediaUrls(items);
        const restoredBooks = [];
        for (const item of linkedItems) {
          if (cancelled || !item?.id || !item.url) continue;
          try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const text = decodeBookBuffer(await response.arrayBuffer());
            if (!text.trim()) continue;
            restoredBooks.push(buildBookFromMediaItem(item, text));
          } catch (error) {
            console.warn("[folio] restore book from media failed", item.id, error);
          }
        }
        if (cancelled || restoredBooks.length === 0) return;
        updateData(prev => {
          const existingBooks = prev.books || [];
          const existingKeys = new Set(
            existingBooks.flatMap(book => [book.mediaItemId, book.storageKey, book.id]).filter(Boolean),
          );
          const missingBooks = restoredBooks.filter(book => !existingKeys.has(book.mediaItemId) && !existingKeys.has(book.storageKey));
          if (missingBooks.length === 0) return prev;
          return { ...prev, books: [...missingBooks, ...existingBooks] };
        });
      } catch (error) {
        console.warn("[folio] load media books failed", error);
      }
    }

    restoreBooksFromR2();
    return () => { cancelled = true; };
  }, [updateData]);

  async function handleFileImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(""); setImporting(true);
    try {
      let mediaItem = null;
      if (mediaUploadProvider === "r2") {
        mediaItem = await uploadMediaFile(file, {
          type: "book",
          title: file.name.replace(/\.(txt|md|epub|pdf)$/i, ""),
          metadata: { source: "folio", original_filename: file.name },
        });
      }
      const buffer = await file.arrayBuffer();
      const text = decodeBookBuffer(buffer);
      const chapters = detectChapters(text);
      const book = { id: genId(), title: file.name.replace(/\.(txt|md)$/, ""), author: "", categoryId: "未分类", isStarred: false, addedAt: new Date().toISOString(), chapters, highlights: [] };
      Object.assign(book, {
        title: file.name.replace(/\.(txt|md|epub|pdf)$/i, ""),
        mediaItemId: mediaItem?.id || "",
        storageProvider: mediaItem?.storage_provider || "",
        storageKey: mediaItem?.storage_key || "",
      });
      updateData(prev => ({ ...prev, books: [book, ...(prev.books || [])] }));
    } catch (err) {
      if (err.storage_key) {
        setImportError(`文件已上传但登记失败：${err.storage_key}`);
        return;
      }
      setImportError("导入失败：" + err.message);
    } finally {
      setImporting(false);
    }
    e.target.value = "";
  }

  // ── Migrate local-only books to R2 ──────────────────────────────────────
  async function handleMigrateToR2() {
    if (mediaUploadProvider !== "r2") return;
    const localBooks = (data.books || []).filter(b => !b.mediaItemId && b.chapters?.length > 0);
    if (localBooks.length === 0) { setMigrateResult({ done: 0, total: 0, errors: [] }); return; }
    setMigratingToR2(true);
    setMigrateResult(null);
    let done = 0; const errors = [];
    for (const book of localBooks) {
      try {
        // Reconstruct text from chapters
        const lines = [];
        for (const ch of book.chapters) {
          if (ch.title) lines.push(ch.title);
          if (ch.content) lines.push(ch.content);
        }
        const text = lines.join("\n\n");
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const file = new File([blob], `${book.title || book.id}.txt`, { type: "text/plain" });
        const mediaItem = await uploadMediaFile(file, {
          type: "book",
          title: book.title || book.id,
          metadata: { source: "folio_migration", book_id: book.id },
        });
        // Update book record
        updateData(prev => ({
          ...prev,
          books: prev.books.map(b => b.id === book.id
            ? { ...b, mediaItemId: mediaItem?.id || "", storageProvider: "r2", storageKey: mediaItem?.storage_key || "" }
            : b
          ),
        }));
        done++;
      } catch (err) {
        console.warn("[folio] migrate to R2 failed", book.id, err);
        errors.push(book.title || book.id);
      }
    }
    setMigratingToR2(false);
    setMigrateResult({ done, total: localBooks.length, errors });
  }

  function handleMouseUp(event) {
    if (!contentRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setSelectionInfo(null); return; }
    const range = sel.getRangeAt(0);
    if (!contentRef.current.contains(range.commonAncestorContainer)) { setSelectionInfo(null); return; }
    const preRange = document.createRange();
    preRange.selectNodeContents(contentRef.current);
    preRange.setEnd(range.startContainer, range.startOffset);
    const start = preRange.toString().length;
    const end = start + range.toString().length;
    if (end <= start) { setSelectionInfo(null); return; }
    const rect = range.getBoundingClientRect();
    setSidebarOpen(false);
    setReadingSettingsOpen(false);
    setActiveHighlight(null);
    setSelectionInfo({ text: range.toString(), start, end, rect });
    if (event?.type === "touchend") event.preventDefault();
    window.setTimeout(clearBrowserSelection, 0);
  }

  function createHighlight() {
    if (!selectionInfo || !currentBook) return;
    const highlight = { id: genId(), chapterIndex: currentChapterIndex, startOffset: selectionInfo.start, endOffset: selectionInfo.end, text: selectionInfo.text, thoughts: [], createdAt: new Date().toISOString() };
    updateData(prev => ({ ...prev, books: prev.books.map(b => b.id !== currentBookId ? b : { ...b, highlights: [...(b.highlights || []), highlight] }) }));
    setSelectionInfo(null);
    clearBrowserSelection();
    setActiveHighlight(highlight);
  }

  function goPrevChapter() {
    setCurrentChapterIndex(i => Math.max(0, i - 1));
  }

  function goNextChapter() {
    const lastIndex = Math.max(0, (currentBook?.chapters?.length || 1) - 1);
    setCurrentChapterIndex(i => Math.min(lastIndex, i + 1));
  }

  function getReaderEventElement(event) {
    const target = event.target;
    if (target instanceof Element) return target;
    if (target instanceof Node && target.parentElement) return target.parentElement;
    return null;
  }

  function isReaderInteractiveTarget(event) {
    const target = getReaderEventElement(event);
    return !!target?.closest("button, a, input, textarea, select, mark, .folio-selection-popover, .folio-chapter-nav");
  }

  function handleReadingBodyPointerDown(event) {
    if (isReaderInteractiveTarget(event)) {
      readingPointerRef.current = null;
      return;
    }
    readingPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };
  }

  function pageBackward() {
    const body = bodyRef.current;
    if (!body) return;
    const pageStep = Math.max(120, body.clientHeight - 34);
    if (isPagedMode) {
      setReadingPageTop(top => Math.max(0, top - pageStep));
    } else {
      body.scrollTo({ top: Math.max(0, body.scrollTop - pageStep), behavior: "smooth" });
    }
  }

  function pageForward() {
    const body = bodyRef.current;
    if (!body) return;
    const pageStep = Math.max(120, body.clientHeight - 34);
    if (isPagedMode) {
      const inner = pageInnerRef.current;
      if (!inner) return;
      const maxTop = Math.max(0, inner.scrollHeight - body.clientHeight);
      setReadingPageTop(top => Math.min(maxTop, top + pageStep));
    } else {
      const maxTop = Math.max(0, body.scrollHeight - body.clientHeight);
      body.scrollTo({ top: Math.min(maxTop, body.scrollTop + pageStep), behavior: "smooth" });
    }
  }

  function handleReadingBodyPointerUp(event) {
    const start = readingPointerRef.current;
    readingPointerRef.current = null;
    if (!start) return;
    if (isReaderInteractiveTarget(event)) return;
    if (window.getSelection()?.toString()) return;
    if (activeHighlight || sidebarOpen || readingSettingsOpen || selectionInfo) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const moved = Math.hypot(dx, dy);
    const elapsed = Date.now() - start.time;
    if (moved > 34) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < -34) pageForward();
        if (dx > 34) pageBackward();
      } else if (isPagedMode) {
        if (dy < -34) pageForward();
        if (dy > 34) pageBackward();
      }
      return;
    }
    if (moved > 10 || elapsed > 450) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (x > rect.width * 0.5) {
      pageForward();
    } else {
      pageBackward();
    }
  }

  function addThought(content) {
    if (!activeHighlight || !currentBookId || !currentBook) throw new Error("划线状态丢了，重新点一下划线。");
    const sourceHighlight = currentBook.highlights?.find(h => h.id === activeHighlight.id);
    if (!sourceHighlight) throw new Error("没找到这条划线，发布失败。");
    const agentObj = agents.find(a => a.agent_id === activeActor);
    const thought = { id: genId(), authorType: activeActor === "user" ? "user" : "agent", authorId: activeActor === "user" ? "user" : activeActor, authorName: activeActor === "user" ? "我" : (agentObj?.display_name || activeActor), content, createdAt: new Date().toISOString(), comments: [] };
    const nextHighlight = { ...sourceHighlight, thoughts: [...(sourceHighlight.thoughts || []), thought] };
    updateData(prev => ({
      ...prev,
      books: (prev.books || []).map(b => {
        if (b.id !== currentBookId) return b;
        return {
          ...b,
          highlights: (b.highlights || []).map(h => {
            if (h.id !== activeHighlight.id) return h;
            return nextHighlight;
          })
        };
      })
    }));
    setActiveHighlight(nextHighlight);
  }

  function addComment(thoughtId, content) {
    if (!activeHighlight || !currentBookId || !currentBook) throw new Error("划线状态丢了，重新点一下划线。");
    const sourceHighlight = currentBook.highlights?.find(h => h.id === activeHighlight.id);
    if (!sourceHighlight) throw new Error("没找到这条划线，回复失败。");
    const hasThought = (sourceHighlight.thoughts || []).some(t => t.id === thoughtId);
    if (!hasThought) throw new Error("没找到这条感想，回复失败。");
    const agentObj = agents.find(a => a.agent_id === activeActor);
    const comment = { id: genId(), authorType: activeActor === "user" ? "user" : "agent", authorName: activeActor === "user" ? "我" : (agentObj?.display_name || activeActor), content, createdAt: new Date().toISOString() };
    const nextHighlight = {
      ...sourceHighlight,
      thoughts: (sourceHighlight.thoughts || []).map(t => (
        t.id !== thoughtId ? t : { ...t, comments: [...(t.comments || []), comment] }
      ))
    };
    updateData(prev => ({
      ...prev,
      books: (prev.books || []).map(b => {
        if (b.id !== currentBookId) return b;
        return {
          ...b,
          highlights: (b.highlights || []).map(h => {
            if (h.id !== activeHighlight.id) return h;
            return nextHighlight;
          })
        };
      })
    }));
    setActiveHighlight(nextHighlight);
  }

  // ── Shelf ─────────────────────────────────────────────────
  if (view === "shelf") {
    return (
      <div className={`folio-shell ${entering ? "folio-view-enter" : ""}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,text/plain,text/markdown"
          onChange={handleFileImport}
          hidden
        />
        <header className="folio-header">
          <button className="folio-back-btn" onClick={onClose}>‹</button>
          <span className="folio-header-title">Folio</span>
          <button className="folio-icon-btn" onClick={() => fileInputRef.current?.click()} disabled={importing}>
            {importing ? "…" : "＋"}
          </button>
        </header>
        <div className="folio-tabs-scroll">
          {categories.map(cat => (
            <button key={cat} className={`folio-tab ${activeTab === cat ? "active" : ""}`} onClick={() => setActiveTab(cat)}>
              {cat}
            </button>
          ))}
        </div>
        {importError && <div className="folio-error">{importError}</div>}
        {/* R2 migration banner */}
        {mediaUploadProvider === "r2" && (() => {
          const unsynced = (data.books || []).filter(b => !b.mediaItemId && b.chapters?.length > 0).length;
          if (unsynced === 0 && !migrateResult) return null;
          return (
            <div style={{ padding: "8px 14px", fontSize: 12, color: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {migrateResult ? (
                <span>✓ 已同步 {migrateResult.done}/{migrateResult.total} 本{migrateResult.errors.length > 0 ? `，${migrateResult.errors.length} 本失败` : ""}</span>
              ) : (
                <>
                  <span>{unsynced} 本书仅存本地</span>
                  <button onClick={handleMigrateToR2} disabled={migratingToR2} style={{ fontSize: 11, padding: "2px 8px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, background: "transparent", cursor: "pointer", color: "rgba(0,0,0,0.55)" }}>
                    {migratingToR2 ? "同步中…" : "同步到云端 ↑"}
                  </button>
                </>
              )}
            </div>
          );
        })()}
        <div className="folio-shelf">
          {books.length === 0 && (
            <div className="folio-empty">
              <p>书架空空如也</p>
              <button onClick={() => fileInputRef.current?.click()} disabled={importing}>
                {importing ? "导入中..." : "导入 TXT / MD"}
              </button>
            </div>
          )}
          {books.filter(b => activeTab === "全部" || (b.categoryId || "未分类") === activeTab)
            .sort((a, b) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))
            .map((book, idx) => {
            const palette = coverPalette(book.title);
            return (
              <button key={book.id} className={`folio-book-spine ${book.isStarred ? "starred" : ""}`} style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => { setCurrentBookId(book.id); setCurrentChapterIndex(0); goToView("cover"); }}>
                <div className="folio-book-cover-art" style={{ background: `linear-gradient(140deg, ${palette.from} 0%, ${palette.to} 100%)` }}>
                  <span className="folio-book-initial" style={{ fontSize: book.title.length > 5 ? 14 : 18, whiteSpace: "normal", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.3, padding: "0 6px", width: "100%", boxSizing: "border-box" }}>
                    {book.title}
                  </span>
                </div>
                <div className="folio-book-meta">
                  <strong>{book.title}</strong>
                  {book.author && <small>{book.author}</small>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Cover ─────────────────────────────────────────────────
  if (view === "cover" && currentBook) {
    const palette = coverPalette(currentBook.title);

    function handleDeleteBook() {
      if (window.confirm(`确定要删除《${currentBook.title}》吗？所有的划线和笔记也将被永久删除。`)) {
        updateData(prev => ({ ...prev, books: prev.books.filter(b => b.id !== currentBook.id) }));
        setCoverMenuOpen(false);
        goToView("shelf");
      }
    }

    function handleEditTitle() {
      const newTitle = window.prompt("修改书名：", currentBook.title);
      if (newTitle && newTitle.trim() && newTitle.trim() !== currentBook.title) {
        updateData(prev => ({ ...prev, books: prev.books.map(b => b.id === currentBook.id ? { ...b, title: newTitle.trim() } : b) }));
      }
      setCoverMenuOpen(false);
    }

    function handleToggleStar() {
      updateData(prev => ({
        ...prev,
        books: prev.books.map(b => b.id === currentBook.id ? { ...b, isStarred: !b.isStarred } : { ...b, isStarred: false })
      }));
      setCoverMenuOpen(false);
    }

    function handleEditTag() {
      const newTag = window.prompt("设置书籍分类标签（例如：言情、悬疑）：", currentBook.categoryId || "未分类");
      if (newTag && newTag.trim()) {
        const tag = newTag.trim();
        updateData(prev => {
          const cats = prev.categories || ["全部", "未分类", "言情", "悬疑", "奇幻", "沙雕"];
          if (!cats.includes(tag)) cats.push(tag);
          return { ...prev, categories: cats, books: prev.books.map(b => b.id === currentBook.id ? { ...b, categoryId: tag } : b) };
        });
      }
    }

    return (
      <div className={`folio-shell ${entering ? "folio-view-enter" : ""}`}>
        <header className="folio-header">
          <button className="folio-back-btn" onClick={() => goToView("shelf")}>‹</button>
          <span className="folio-header-title">书籍详情</span>
          <span />
        </header>
        <div className="folio-cover-page">
          <div className="folio-cover-art-large" style={{ background: `linear-gradient(140deg, ${palette.from} 0%, ${palette.to} 60%, ${palette.accent} 100%)` }}>
            <span>{currentBook.title.slice(0, 2)}</span>
          </div>
          <div className="folio-cover-info">
            <h1>{currentBook.title}</h1>
            <div className="folio-cover-stats">
              <span style={{ display: "flex", alignItems: "center" }}>
                分类: <button className="folio-text-btn" onClick={handleEditTag} style={{ marginLeft: 4 }}>{currentBook.categoryId || "未分类"}</button>
                <button className="folio-icon-btn" style={{ color: "#a08c82", padding: "0 4px" }} onClick={handleEditTag}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </button>
              </span>
              <span>·</span>
              <span>{currentBook.chapters?.length || 0} 章</span>
              <span>·</span>
              <span>{currentBook.highlights?.length || 0} 划线</span>
            </div>
          </div>
          <div className="folio-cover-actions">
            <button className="folio-primary-btn" onClick={() => { setCurrentChapterIndex(0); goToView("reading"); }}>开始阅读</button>
            <button className="folio-secondary-btn folio-more-btn" onClick={() => setCoverMenuOpen(open => !open)} aria-label="更多操作" aria-expanded={coverMenuOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>
            </button>
            {coverMenuOpen && (
              <div className="folio-cover-menu">
                <button onClick={handleToggleStar}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={currentBook.isStarred ? "#dca08c" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {currentBook.isStarred ? "取消星标" : "星标"}
                </button>
                <button onClick={handleEditTitle}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  编辑书名
                </button>
                <button className="danger" onClick={handleDeleteBook}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  删除书籍
                </button>
              </div>
            )}
          </div>
          <div className="folio-chapter-preview">
            <div className="folio-section-label">章节目录</div>
            {currentBook.chapters?.map((ch, i) => {
              const hasHighlights = currentBook.highlights?.some(h => h.chapterIndex === i);
              return (
                <button key={i} className="folio-chapter-row" onClick={() => { setCurrentChapterIndex(i); goToView("reading"); }}>
                  <span className="folio-chapter-title">{ch.title}</span>
                  {hasHighlights && <span className="folio-chapter-dot" title="有划线" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Reading ───────────────────────────────────────────────
  if (view === "reading" && currentBook && currentChapter) {
    return (
      <div className={`folio-shell folio-reading-shell ${entering ? "folio-view-enter" : ""}`}>
        {sidebarOpen && <div className="folio-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <div className={`folio-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="folio-sidebar-head">
            <span>目录</span>
            <button onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <div className="folio-sidebar-list">
            {currentBook.chapters?.map((ch, i) => {
              const hasHighlights = currentBook.highlights?.some(h => h.chapterIndex === i);
              return (
                <button key={i} className={`folio-sidebar-item ${i === currentChapterIndex ? "active" : ""}`}
                  onClick={() => { clearReaderTransientState(); setCurrentChapterIndex(i); setSidebarOpen(false); }}>
                  <span className="folio-sidebar-title">{ch.title}</span>
                  {hasHighlights && <span className="folio-chapter-dot" />}
                </button>
              );
            })}
          </div>
        </div>

        <header className="folio-reading-header">
          <button className="folio-sidebar-toggle" onClick={openSidebar} aria-label="章节目录">≡</button>
          <span className="folio-reading-title">{currentBook.title}</span>
          <button className="folio-sidebar-toggle" onClick={openReadingSettings} aria-label="阅读设置">Aa</button>
          <button className="folio-back-btn" onClick={() => { goToView("cover"); }}>✕</button>
        </header>

        <div
          ref={bodyRef}
          className={`folio-reading-body ${isPagedMode ? "folio-reading-body-paged" : "folio-reading-body-scroll"}`}
          style={{ background: readingPrefs.background }}
          onPointerDown={handleReadingBodyPointerDown}
          onPointerUp={handleReadingBodyPointerUp}
          onPointerCancel={() => { readingPointerRef.current = null; }}
        >
          <div
            ref={pageInnerRef}
            className="folio-reading-page-inner"
            style={{
              transform: isPagedMode ? `translateY(-${readingPageTop}px)` : "none",
              "--folio-reader-font-size": `${readingPrefs.fontSize}px`,
              "--folio-reader-line-height": readingPrefs.lineHeight,
              "--folio-reader-text": readingPrefs.background === "#1f1e22" ? "rgba(245, 238, 230, 0.9)" : "rgba(50, 40, 36, 0.9)",
              "--folio-reader-muted": readingPrefs.background === "#1f1e22" ? "rgba(245, 238, 230, 0.64)" : "rgba(60, 48, 42, 0.9)",
            }}
          >
            <div className="folio-chapter-heading">{currentChapter.title}</div>
            <ReadingContent
              content={currentChapter.content}
              highlights={currentHighlights}
              onHighlightClick={openHighlightPanel}
              contentRef={contentRef}
              onMouseUp={handleMouseUp}
            />
            <div className="folio-chapter-nav">
              {currentChapterIndex > 0 && (
                <button onClick={goPrevChapter}>‹ 上一章</button>
              )}
              <span />
              {currentChapterIndex < (currentBook.chapters?.length || 1) - 1 && (
                <button onClick={goNextChapter}>下一章 ›</button>
              )}
            </div>
          </div>
        </div>

        {readingSettingsOpen && (
          <div className="folio-reading-settings-backdrop" onClick={() => setReadingSettingsOpen(false)}>
            <div className="folio-reading-settings" onClick={(event) => event.stopPropagation()}>
              <div className="folio-reading-settings-head">
                <strong>阅读设置</strong>
                <button onClick={() => setReadingSettingsOpen(false)}>✕</button>
              </div>
              <label>
                <span>字号</span>
                <input
                  type="range"
                  min="14"
                  max="22"
                  step="1"
                  value={readingPrefs.fontSize}
                  onChange={(event) => updateReadingPrefs({ fontSize: Number(event.target.value) })}
                />
                <em>{readingPrefs.fontSize}px</em>
              </label>
              <label>
                <span>行距</span>
                <input
                  type="range"
                  min="1.5"
                  max="2.4"
                  step="0.1"
                  value={readingPrefs.lineHeight}
                  onChange={(event) => updateReadingPrefs({ lineHeight: Number(event.target.value) })}
                />
                <em>{readingPrefs.lineHeight.toFixed(1)}</em>
              </label>
              <div className="folio-reading-setting-row">
                <span>背景色</span>
                {[
                  ["#faf8f5", "米白"],
                  ["#f3efe7", "纸张"],
                  ["#edf3ee", "浅绿"],
                  ["#1f1e22", "夜读"],
                ].map(([color, label]) => (
                  <button
                    key={color}
                    className={readingPrefs.background === color ? "active" : ""}
                    style={{ background: color }}
                    onClick={() => updateReadingPrefs({ background: color })}
                    title={label}
                  />
                ))}
              </div>
              <div className="folio-reading-setting-row mode">
                <span>翻页方式</span>
                <button className={readingPrefs.mode === "scroll" ? "active" : ""} onClick={() => updateReadingPrefs({ mode: "scroll" })}>滚动</button>
                <button className={readingPrefs.mode === "paged" ? "active" : ""} onClick={() => updateReadingPrefs({ mode: "paged" })}>点按分页</button>
              </div>
            </div>
          </div>
        )}

        {selectionInfo && !activeHighlight && (
          <div className="folio-selection-popover" style={{ position: "fixed", top: selectionInfo.rect.top - 8, left: "50%", transform: "translateX(-50%) translateY(-100%)", zIndex: 80 }}>
            <button onClick={createHighlight}>✦ 划线留念</button>
          </div>
        )}
        {activeHighlight && (
          <HighlightPanel highlight={activeHighlight} activeActor={activeActor} agents={agents}
            onAddThought={addThought} onAddComment={addComment} onClose={() => setActiveHighlight(null)} />
        )}
      </div>
    );
  }

  return null;
}
