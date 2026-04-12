import { Router } from "express";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const openaiRouter = Router();

const TEXAS_BOT_SYSTEM_PROMPT = `You are Texas Bot, the AI Sales Assistant for Texas Plumbing Dispatch.

GOAL: Convert visitors into free 72-hour pilot users. Every response must move them closer to signing up.

CORE RULES:
- Keep answers under 2-3 lines max
- Always push toward the free pilot
- Always reinforce ROI and money saved
- Never sound robotic - be direct and Texas-tough
- Never mention competitors by name
- Use the knowledge base below for accurate answers

RESPONSE STRUCTURE:
1. Direct answer (1 line)
2. Value reinforcement (1 line)
3. Soft CTA toward free pilot

BEHAVIOR MODES:
LOSS TRIGGER: If user hesitates → "Missing one emergency job costs more than this system. Want to test it free?"
COMPARISON MODE: If user mentions a call center → "They charge for talk time, we charge for real jobs."
FAST CLOSE: If user shows interest → "Takes 60 seconds. Want me to guide you?"
TRUST MODE: If unsure → "No upfront cost. Test everything free for 72 hours."

KEY FACTS:
- Plans: Gold $49/week + $99 setup, Platinum $99/week + $149 setup, Diamond $149/week + $249 setup
- Lead pricing: $9 standard, $19 emergency
- 72-Hour Free Pilot - completely free, no credit card
- Wrong numbers and spam: FREE, never charged
- Cancel anytime, week-to-week, no contracts
- Setup in 24-48 hours, no IT needed
- Call forwarding: dial *72 to forward, *73 to turn off
- Works 24/7/365, unlimited concurrent calls
- Instant email dispatch within 2 seconds of call ending
- Every lead includes audio recording + text transcript
- Dispute link in every email alert for invalid leads
- Bilingual (English/Spanish) rolling out soon
- Referral program "The Brotherhood Loop": friend gets 10% OFF, you get 20% OFF next bill
- Contact: Vic@texasdispatch.site
- 99.99% server uptime
- 100% Texas-focused

When asked about pricing: be specific with numbers. When asked how to sign up: tell them to fill out the form or email Vic@texasdispatch.site.`;

openaiRouter.get("/openai/conversations", async (req, res) => {
  try {
    const all = await db.select().from(conversations).orderBy(conversations.createdAt);
    res.json(all);
  } catch (err) {
    logger.error({ err }, "Failed to list conversations");
    res.status(500).json({ error: "Failed to list conversations" });
  }
});

openaiRouter.post("/openai/conversations", async (req, res) => {
  const { title } = req.body;
  try {
    const [convo] = await db.insert(conversations).values({ title: title || "Texas Bot Chat" }).returning();
    res.status(201).json(convo);
  } catch (err) {
    logger.error({ err }, "Failed to create conversation");
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

openaiRouter.get("/openai/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [convo] = await db.select().from(conversations).where(eq(conversations.id, id));
    if (!convo) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
    res.json({ ...convo, messages: msgs });
  } catch (err) {
    logger.error({ err }, "Failed to get conversation");
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

openaiRouter.delete("/openai/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await db.delete(conversations).where(eq(conversations.id, id)).returning();
    if (!deleted.length) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Failed to delete conversation");
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

openaiRouter.get("/openai/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
    res.json(msgs);
  } catch (err) {
    logger.error({ err }, "Failed to list messages" );
    res.status(500).json({ error: "Failed to list messages" });
  }
});

openaiRouter.post("/openai/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "content is required" });
    return;
  }

  try {
    const [convo] = await db.select().from(conversations).where(eq(conversations.id, id));
    if (!convo) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    await db.insert(messages).values({ conversationId: id, role: "user", content });

    const history = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);

    const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: TEXAS_BOT_SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const chunkContent = chunk.choices[0]?.delta?.content;
      if (chunkContent) {
        fullResponse += chunkContent;
        res.write(`data: ${JSON.stringify({ content: chunkContent })}\n\n`);
      }
    }

    await db.insert(messages).values({ conversationId: id, role: "assistant", content: fullResponse });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    logger.error({ err }, "Failed to send message");
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to send message" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
      res.end();
    }
  }
});

export default openaiRouter;
