export const apiBase =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD ? "https://api.somni-ref.top" : "");

if (typeof window !== "undefined") {
  window.__YUI_API_BASE__ = apiBase;
}

export function apiUrl(path = "") {
  const value = String(path || "");
  if (/^https?:\/\//i.test(value)) return value;
  return `${apiBase}${value.startsWith("/") ? value : `/${value}`}`;
}
