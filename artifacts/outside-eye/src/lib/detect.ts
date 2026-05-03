export function detectProvider(key: string): string {
  if (key.startsWith("AIza")) return "gemini";
  if (key.startsWith("sk-ant-")) return "claude";
  if (key.startsWith("sk-proj-")) return "openai";
  if (key.startsWith("sk-")) return "openai_ambiguous";
  if (key.startsWith("gsk_")) return "groq";
  return "unknown";
}

export function getModel(provider: string): string {
  const models: Record<string, string> = {
    gemini: "gemini-2.5-flash",
    claude: "claude-haiku-4-5-20251001",
    openai: "gpt-4o-mini",
    openai_ambiguous: "gpt-4o-mini",
    groq: "llama-3.3-70b-versatile",
    deepseek: "deepseek-chat",
    qwen: "qwen-plus",
  };
  return models[provider] || "gemini-2.5-flash";
}

export function getProviderLabel(provider: string): string {
  const labels: Record<string, string> = {
    gemini: "GEMINI",
    claude: "CLAUDE",
    openai: "OPENAI",
    openai_ambiguous: "OPENAI",
    groq: "GROQ",
    deepseek: "DEEPSEEK",
    qwen: "QWEN",
  };
  return labels[provider] || "UNKNOWN";
}
