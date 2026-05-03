const key = (room: string) => `outsideeye_session_${room}`;

export interface SessionData {
  output: Record<string, unknown>;
  isDemo: boolean;
  savedAt: number;
}

export function saveSession(room: string, output: Record<string, unknown>, isDemo: boolean): void {
  try {
    localStorage.setItem(key(room), JSON.stringify({ output, isDemo, savedAt: Date.now() }));
  } catch {
    // storage full or blocked — silently skip
  }
}

export function loadSession(room: string): SessionData | null {
  try {
    const raw = localStorage.getItem(key(room));
    return raw ? (JSON.parse(raw) as SessionData) : null;
  } catch {
    return null;
  }
}

export function clearSession(room: string): void {
  localStorage.removeItem(key(room));
}

export function sessionAge(savedAt: number): string {
  const diff = Date.now() - savedAt;
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
