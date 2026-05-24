import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea || typeof idea !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid idea" },
        { status: 400 }
      );
    }

    // Create a detailed prompt for cartoon-style logo
    const prompt = `cute cartoon mascot logo for "${idea}", simple flat design, kawaii style, minimal, vector art, solid background, icon style, high quality, professional logo design`;
    
    // Use Pollinations.ai - Free AI image generation API (no API key needed)
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Date.now()}&nologo=true`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      idea: idea.trim(),
      message: "Logo generated successfully!",
    });
  } catch (error) {
    console.error("Logo generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
