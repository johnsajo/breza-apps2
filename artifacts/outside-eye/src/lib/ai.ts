import { getModel } from "./detect";

interface StoredKey {
  provider: string;
  key: string;
  savedAt: number;
}

export async function callOutsideEye(
  userPrompt: string,
  systemPrompt: string
): Promise<string> {
  const stored = JSON.parse(
    localStorage.getItem("outsideeye_key") || "null"
  ) as StoredKey | null;

  if (!stored) throw new Error("NO_KEY");

  const { provider, key } = stored;
  const model = getModel(provider);

  let rawText = "";

  if (provider === "gemini") {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
      }),
    });
    if (res.status === 401 || res.status === 403) throw new Error("BAD_KEY");
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error("API_ERROR");
    const data = await res.json();
    rawText = data.candidates[0].content.parts[0].text;
  } else if (provider === "claude") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
    if (res.status === 401 || res.status === 403) throw new Error("BAD_KEY");
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error("API_ERROR");
    const data = await res.json();
    rawText = data.content[0].text;
  } else {
    const endpoints: Record<string, string> = {
      openai: "https://api.openai.com/v1/chat/completions",
      openai_ambiguous: "https://api.openai.com/v1/chat/completions",
      groq: "https://api.groq.com/openai/v1/chat/completions",
      deepseek: "https://api.deepseek.com/v1/chat/completions",
      qwen: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    };
    const endpoint = endpoints[provider] || endpoints.openai;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        temperature: 0.8,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });
    if (res.status === 401 || res.status === 403) throw new Error("BAD_KEY");
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error("API_ERROR");
    const data = await res.json();
    rawText = data.choices[0].message.content;
  }

  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return cleaned;
}
