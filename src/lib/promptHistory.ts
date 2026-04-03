const STORAGE_KEY = "contextual-ipsum-prompt-history";
const MAX_HISTORY = 10;

export interface PromptHistoryItem {
  prompt_text: string;
  timestamp: number;
}

export function getPromptHistory(): PromptHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PromptHistoryItem[];
  } catch {
    return [];
  }
}

export function savePromptToHistory(prompt: string): void {
  const trimmed = prompt.trim();
  if (!trimmed) return;

  const history = getPromptHistory();

  // Prevent duplicate consecutive
  if (history.length > 0 && history[0].prompt_text === trimmed) return;

  const newItem: PromptHistoryItem = {
    prompt_text: trimmed,
    timestamp: Date.now(),
  };

  const updated = [newItem, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearPromptHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
