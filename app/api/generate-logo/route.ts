import { NextRequest, NextResponse } from "next/server";
import { experimental_generateImage as generateImage } from "ai";

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Missing idea parameter" },
        { status: 400 }
      );
    }

    const prompt = `Create a small, cute cartoon-style logo icon for "${idea}". The logo should be:
- Simple and minimalist design
- Cartoon/mascot style with friendly appearance
- Suitable as a website favicon or small logo
- Clean lines with vibrant colors
- White or transparent background
- No text, just the icon/mascot`;

    const { image } = await generateImage({
      model: "openai/dall-e-3",
      prompt: prompt,
      size: "1024x1024",
    });

    // Convert to base64 data URL
    const base64 = image.base64;
    const imageUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ imageUrl, idea });
  } catch (error) {
    console.error("[v0] Logo generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate logo";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
