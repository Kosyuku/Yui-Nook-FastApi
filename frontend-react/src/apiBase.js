export const apiBase =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD ? "https://api.somni-ref.top" : "");

const _gatewaySecret = import.meta.env.VITE_GATEWAY_SECRET || "";

if (typeof window !== "undefined") {
  window.__YUI_API_BASE__ = apiBase;

  // 给所有发往本网关的 fetch 请求自动加上鉴权 header
  if (_gatewaySecret) {
    const _origFetch = window.fetch.bind(window);
    window.fetch = (url, options = {}) => {
      const urlStr = typeof url === "string" ? url : (url?.url ?? String(url));
      const isApiCall =
        (apiBase && urlStr.startsWith(apiBase)) ||
        (!urlStr.startsWith("http") && urlStr.startsWith("/api"));
      if (isApiCall) {
        const headers = new Headers(options.headers || {});
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${_gatewaySecret}`);
        }
        return _origFetch(url, { ...options, headers });
      }
      return _origFetch(url, options);
    };
  }
}

export function apiUrl(path = "") {
  const value = String(path || "");
  if (/^https?:\/\//i.test(value)) return value;
  return `${apiBase}${value.startsWith("/") ? value : `/${value}`}`;
}
