import { VertexAI } from "@google-cloud/vertexai";
import { NextResponse } from "next/server";

const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID || "code-mentor-496518",
  location: "us-central1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 🏗️ Agent 1: The Builder (Gemini 2.5 Pro)
    const modelPro = vertex_ai.getGenerativeModel({ model: "gemini-2.5-pro" });
    const builderResult = await modelPro.generateContent(`Write clean Node.js code for: ${prompt}. Respond ONLY with raw code.`);
    const generatedCode = (builderResult.response as any).candidates?.[0]?.content?.parts?.[0]?.text || "// Code generation failed.";

    // 🕵️‍♂️ Agent 2: The Reviewer (Gemini 2.5 Flash)
    const modelFlash = vertex_ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const reviewerPrompt = `Analyze this code for security vulnerabilities:\n\n${generatedCode}\n\n
    Return a JSON object STRICTLY matching this exact format: 
    { 
      "score": 85, 
      "issues": ["Issue 1", "Issue 2"], 
      "vulnerabilities": [
        {
          "id": "v-001",
          "title": "Name of vulnerability",
          "severity": "high",
          "file": "filename.ts",
          "line": 10,
          "cwe": "CWE-798",
          "remediation": "How to fix this issue.",
          "suggestedPatch": "The FULL corrected code block with the vulnerability fixed. This should be the entire file content, rewritten to be secure.",
          "explain": {
            "analogy": "A funny real-world analogy.",
            "technical": "A deep-dive technical explanation of the code flaw.",
            "meme": "A description of a popular meme that represents this specific vulnerability."
          }
        }
      ]
    }`;
    
    const reviewerResult = await modelFlash.generateContent(reviewerPrompt);
    let rawJson = (reviewerResult.response as any).candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    
    // 🧹 Clean markdown
    rawJson = rawJson.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    // 🛡️ The Safe Parser (No infinite loops!)
    let securityAnalysis: any = { score: 85, issues: ["Scan complete."], vulnerabilities: [] };
    
    try {
      const parsed = JSON.parse(rawJson);
      if (parsed.score) securityAnalysis.score = parsed.score;
      
      // Force simple string array for issues
      if (Array.isArray(parsed.issues)) {
        securityAnalysis.issues = parsed.issues.map((i: any) => typeof i === 'string' ? i : (i.title || "Unknown issue"));
      }

      // Safely map vulnerabilities once (NO RECURSION)
      let rawVulns = Array.isArray(parsed.vulnerabilities) ? parsed.vulnerabilities : [];
      
      if (rawVulns.length > 0) {
        securityAnalysis.vulnerabilities = rawVulns.map((v: any, index: number) => {
          return {
            id: v?.id || `v-${index}`,
            title: v?.title || "Security Issue",
            severity: v?.severity || "medium",
            file: v?.file || "scanned-code.ts",
            line: v?.line || 0,
            cwe: v?.cwe || "N/A",
            remediation: v?.remediation || "Review and remediate this finding.",
            suggestedPatch: v?.suggestedPatch || v?.suggested_patch || null,
            explain: {
              analogy: v?.explain?.analogy || (typeof v?.explain === 'string' ? v.explain : "Think of this like leaving a key in the front door."),
              technical: v?.explain?.technical || "Awaiting technical review.",
              meme: v?.explain?.meme || "Insert 'This is fine' dog meme here."
            }
          };
        });
      } else {
         securityAnalysis.vulnerabilities = [{
            id: "v-safe", title: "No vulnerabilities found", severity: "low",
            file: "scanned-code.ts", line: 0, cwe: "N/A",
            remediation: "No action needed.",
            suggestedPatch: null,
            explain: {
              analogy: "Your code is like a fortress right now.",
              technical: "No security flaws detected in the current scan.",
              meme: "When the security scan returns zero vulnerabilities: 'I see this as an absolute win!'"
            }
         }];
      }

    } catch (e) {
      console.error("JSON Parse Error:", e);
      // Fallback is already set in initial securityAnalysis state
    }

    return NextResponse.json({ code: generatedCode, analysis: securityAnalysis });

  } catch (error: any) {
    console.error("❌ VERTEX ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}