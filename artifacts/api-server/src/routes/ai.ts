import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

router.post("/ai/chat", async (req, res) => {
  const { systemPrompt, userPrompt } = req.body as {
    systemPrompt?: string;
    userPrompt?: string;
  };

  if (!systemPrompt || !userPrompt) {
    res.status(400).json({ error: "systemPrompt and userPrompt are required" });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      max_completion_tokens: 1500,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    res.json({ text });
  } catch (err: unknown) {
    req.log.error({ err }, "AI chat error");
    const status =
      err instanceof Error && err.message.includes("429") ? 429 : 500;
    res.status(status).json({ error: "AI request failed" });
  }
});

export default router;
