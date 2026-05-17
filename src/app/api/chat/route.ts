import { VertexAI } from "@google-cloud/vertexai";
import { NextResponse } from "next/server";

const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID || "code-mentor-496518",
  location: "us-central1",
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const model = vertex_ai.getGenerativeModel({ model: "gemini-2.5-pro" });

    // Build conversation context from history
    const historyContext = (history || [])
      .map((m: any) => `${m?.role === "user" ? "User" : "Assistant"}: ${m?.content || ""}`)
      .join("\n");

    const systemPrompt = `You are Code Mentor, an elite AI-powered security assistant built into an enterprise IDE. 
You help security teams review code, write governance policies, explain vulnerabilities, and enforce compliance.
Be concise, technical, and helpful. Use markdown formatting for code blocks and lists.
If the user asks about security policies, reference CWE IDs and OWASP categories where relevant.

Previous conversation:
${historyContext}

User: ${message}

Respond helpfully and concisely:`;

    const result = await model.generateContent(systemPrompt);
    const text = (result.response as any).candidates?.[0]?.content?.parts?.[0]?.text 
      || "I apologize, I couldn't process that request. Please try again.";

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("❌ CHAT VERTEX ERROR:", error?.message);
    return NextResponse.json(
      { reply: "Sorry, the AI service is temporarily unavailable. Please try again in a moment." },
      { status: 200 } // Return 200 so the UI can display the message gracefully
    );
  }
}
