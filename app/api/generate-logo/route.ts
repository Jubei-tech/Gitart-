import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Missing idea parameter" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `Create a small, cute cartoon-style logo icon for "${idea}". The logo should be:
- Simple and minimalist design
- Cartoon/mascot style with friendly appearance
- Suitable as a website favicon or small logo
- Clean lines with vibrant colors
- White or transparent background
- No text, just the icon/mascot`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[v0] OpenAI API error:", error);
      return NextResponse.json(
        { error: error.error?.message || "Failed to generate logo" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl, idea });
  } catch (error) {
    console.error("[v0] Logo generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate logo" },
      { status: 500 }
    );
  }
}
