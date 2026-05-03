const KEY = "outsideeye_feedback";

export type Rating = "up" | "down";

export interface FeedbackEntry {
  roomKey: string;
  rating: Rating;
  note?: string;
  at: number;
}

export function saveFeedback(roomKey: string, rating: Rating): void {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  const prev = existing.find((e) => e.roomKey === roomKey);
  const filtered = existing.filter((e) => e.roomKey !== roomKey);
  localStorage.setItem(
    KEY,
    JSON.stringify([
      ...filtered,
      { roomKey, rating, note: prev?.note, at: Date.now() },
    ])
  );
}

export function saveNote(roomKey: string, note: string): void {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  const updated = existing.map((e) =>
    e.roomKey === roomKey
      ? { ...e, note: note.trim() || undefined }
      : e
  );
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getFeedback(roomKey: string): Rating | null {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  return existing.find((e) => e.roomKey === roomKey)?.rating ?? null;
}

export function getNote(roomKey: string): string {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  return existing.find((e) => e.roomKey === roomKey)?.note ?? "";
}

export function getAllFeedback(): FeedbackEntry[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
