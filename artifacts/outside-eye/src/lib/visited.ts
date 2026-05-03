const KEY = "outsideeye_visited";

export function markVisited(roomKey: string): void {
  const existing: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (!existing.includes(roomKey)) {
    localStorage.setItem(KEY, JSON.stringify([...existing, roomKey]));
    window.dispatchEvent(new CustomEvent("outsideeye:visited", { detail: roomKey }));
  }
}

export function getVisited(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
