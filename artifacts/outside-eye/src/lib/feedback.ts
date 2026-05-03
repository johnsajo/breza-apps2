const KEY = "outsideeye_feedback";

export type Rating = "up" | "down";

export interface FeedbackEntry {
  roomKey: string;
  rating: Rating;
  at: number;
}

export function saveFeedback(roomKey: string, rating: Rating): void {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  const filtered = existing.filter((e) => e.roomKey !== roomKey);
  localStorage.setItem(
    KEY,
    JSON.stringify([...filtered, { roomKey, rating, at: Date.now() }])
  );
}

export function getFeedback(roomKey: string): Rating | null {
  const existing: FeedbackEntry[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
  return existing.find((e) => e.roomKey === roomKey)?.rating ?? null;
}

export function getAllFeedback(): FeedbackEntry[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
