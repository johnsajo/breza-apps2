import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

type ImageContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail: "high" } };

router.post("/ai/chat", async (req, res) => {
  const { systemPrompt, userPrompt, imageBase64, imageType } = req.body as {
    systemPrompt?: string;
    userPrompt?: string;
    imageBase64?: string;
    imageType?: string;
  };

  if (!systemPrompt || !userPrompt) {
    res.status(400).json({ error: "systemPrompt and userPrompt are required" });
    return;
  }

  const userContent: string | ImageContent[] = imageBase64
    ? [
        {
          type: "image_url" as const,
          image_url: {
            url: `data:${imageType || "image/png"};base64,${imageBase64}`,
            detail: "high" as const,
          },
        },
        { type: "text" as const, text: userPrompt },
      ]
    : userPrompt;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      max_completion_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const text = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    res.json({ text });
  } catch (err: unknown) {
    req.log.error({ err }, "AI chat error");
    const status =
      err instanceof Error && err.message.includes("429") ? 429 : 500;
    res.status(status).json({ error: "AI request failed" });
  }
});

export default router;
