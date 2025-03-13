import { NextRequest } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { prompt } = reqBody;

    // Validate input
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // System prompt to guide AI response
    const systemPrompt = `Act as a Project Generator AI. Your task is to generate a JSON response containing the folder structure, file paths, and code content for a project based on the user's one-line input. Follow these guidelines strictly:
    
    1. **Input**: ${prompt}
    2. **Output**: Generate a JSON response with the following structure:
    \`\`\`json
    {
      "project": {
        "folder/filePath": "fileContent",
        "folder/filePath": "fileContent",
        ...
      }
    }
    \`\`\`
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_tokens: 4096,
      top_p: 0.95,
      stream: true, // Streaming enabled
    });

    // Convert async iterator (stream) into a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatCompletion) {
            const text = chunk.choices?.[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
