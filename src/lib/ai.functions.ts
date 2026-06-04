import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key)(MODEL);
}

async function run(system: string, prompt: string) {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return { text };
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      recipient: z.string().max(200).optional().default(""),
      subject: z.string().max(300).optional().default(""),
      tone: z.string().max(50).default("professional"),
      keyPoints: z.string().min(1).max(4000),
    }),
  )
  .handler(async ({ data }) => {
    const system =
      "You are an expert workplace email writer. Produce a complete, ready-to-send email. " +
      "Use clear structure: subject line (if not provided), greeting, body, sign-off. " +
      "Keep it concise, polished, and appropriate for the requested tone.";
    const prompt = [
      `Recipient: ${data.recipient || "(unspecified)"}`,
      `Subject hint: ${data.subject || "(none — propose one)"}`,
      `Tone: ${data.tone}`,
      `Key points to cover:\n${data.keyPoints}`,
      "",
      "Return only the email text.",
    ].join("\n");
    return run(system, prompt);
  });

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ notes: z.string().min(1).max(20000) }))
  .handler(async ({ data }) => {
    const system =
      "You are a meeting notes analyst. Summarize the meeting notes into:\n" +
      "1. **TL;DR** (2-3 sentences)\n" +
      "2. **Key Decisions**\n" +
      "3. **Action Items** (with owner if mentioned)\n" +
      "4. **Open Questions / Follow-ups**\n" +
      "Use markdown. Be specific and faithful to the source notes.";
    return run(system, data.notes);
  });

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      goal: z.string().min(1).max(2000),
      deadline: z.string().max(100).optional().default(""),
      context: z.string().max(2000).optional().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const system =
      "You are an AI task planner for busy professionals. Break the goal into a prioritized, " +
      "actionable task list. Use markdown with checkboxes (`- [ ]`). Group by phase if helpful. " +
      "Include estimated effort (S/M/L) and suggested order. End with a short 'Next step' line.";
    const prompt = [
      `Goal: ${data.goal}`,
      data.deadline ? `Deadline: ${data.deadline}` : "",
      data.context ? `Context: ${data.context}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return run(system, prompt);
  });

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      topic: z.string().min(1).max(2000),
      depth: z.enum(["brief", "standard", "deep"]).default("standard"),
    }),
  )
  .handler(async ({ data }) => {
    const system =
      "You are an AI research assistant for professionals. Produce a structured briefing in markdown:\n" +
      "- **Overview**\n- **Key Concepts**\n- **Important Considerations / Trade-offs**\n" +
      "- **Recommended Next Steps**\n" +
      "Be factual, neutral, and acknowledge uncertainty where appropriate. " +
      "Do not fabricate citations.";
    const lengthHint =
      data.depth === "brief"
        ? "Keep it under ~250 words."
        : data.depth === "deep"
          ? "Provide a thorough briefing (~700-1000 words)."
          : "Aim for ~400-600 words.";
    return run(system, `Research topic: ${data.topic}\n\n${lengthHint}`);
  });
