import { getModel } from "./detect";

interface StoredKey {
  provider: string;
  key: string;
  savedAt: number;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

async function callViaServer(
  userPrompt: string,
  systemPrompt: string,
  imageBase64?: string,
  imageType?: string
): Promise<string> {
  const res = await fetch(`${import.meta.env.BASE_URL}../api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, userPrompt, imageBase64, imageType }),
  });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error("API_ERROR");
  const data = (await res.json()) as { text?: string; error?: string };
  if (!data.text) throw new Error("API_ERROR");
  return stripMarkdown(data.text);
}

export async function callOutsideEye(
  userPrompt: string,
  systemPrompt: string,
  imageBase64?: string,
  imageType?: string
): Promise<string> {
  if (localStorage.getItem("outsideeye_mode") === "demo") throw new Error("NO_KEY");

  const stored = JSON.parse(
    localStorage.getItem("outsideeye_key") || "null"
  ) as StoredKey | null;

  if (!stored) {
    return callViaServer(userPrompt, systemPrompt, imageBase64, imageType);
  }

  const { provider, key } = stored;
  const model = getModel(provider);

  let rawText = "";

  if (provider === "gemini") {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const parts: object[] = imageBase64
      ? [{ inline_data: { mime_type: imageType || "image/png", data: imageBase64 } }, { text: userPrompt }]
      : [{ text: userPrompt }];
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2000 },
      }),
    });
    if (res.status === 401 || res.status === 403) throw new Error("BAD_KEY");
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error("API_ERROR");
    const data = await res.json();
    rawText = data.candidates[0].content.parts[0].text;
  } else if (provider === "claude") {
    const userContent = imageBase64
      ? [
          { type: "image", source: { type: "base64", media_type: imageType || "image/png", data: imageBase64 } },
          { type: "text", text: userPrompt },
        ]
      : userPrompt;
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
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: "user", content: userContent }],
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
    const userContent = imageBase64 && (provider === "openai" || provider === "openai_ambiguous")
      ? [
          { type: "image_url", image_url: { url: `data:${imageType || "image/png"};base64,${imageBase64}`, detail: "high" } },
          { type: "text", text: userPrompt },
        ]
      : userPrompt;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        temperature: 0.8,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });
    if (res.status === 401 || res.status === 403) throw new Error("BAD_KEY");
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error("API_ERROR");
    const data = await res.json();
    rawText = data.choices[0].message.content;
  }

  return stripMarkdown(rawText);
}
