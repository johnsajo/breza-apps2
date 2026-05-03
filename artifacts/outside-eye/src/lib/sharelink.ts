const PARAM = "s";

export type ShareState = Record<string, string | string[]>;

export function encodeShare(state: ShareState): string {
  try {
    const json = JSON.stringify(state);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, b64);
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function decodeShare(): ShareState | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const b64 = params.get(PARAM);
    if (!b64) return null;
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json) as ShareState;
  } catch {
    return null;
  }
}
