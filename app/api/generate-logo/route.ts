import { NextRequest, NextResponse } from "next/server";

// Generate a deterministic color based on the idea string
function generateColors(idea: string) {
  let hash = 0;
  for (let i = 0; i < idea.length; i++) {
    const char = idea.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hue = Math.abs(hash) % 360;
  const primaryColor = `hsl(${hue}, 70%, 50%)`;
  const secondaryColor = `hsl(${(hue + 30) % 360}, 60%, 60%)`;
  const bgColor = `hsl(${(hue + 180) % 360}, 20%, 95%)`;
  
  return { primaryColor, secondaryColor, bgColor, hue };
}

// Generate SVG logo based on idea
function generateSVGLogo(idea: string): string {
  const { primaryColor, secondaryColor, bgColor } = generateColors(idea);
  const initial = idea.charAt(0).toUpperCase();
  
  // Different logo styles based on hash
  const styleIndex = Math.abs(idea.length * idea.charCodeAt(0)) % 4;
  
  let svg = "";
  
  switch (styleIndex) {
    case 0: // Circle with initial
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" fill="${bgColor}" rx="64"/>
          <circle cx="256" cy="256" r="180" fill="url(#grad1)"/>
          <text x="256" y="290" font-family="Arial Black, sans-serif" font-size="180" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
        </svg>
      `;
      break;
    case 1: // Rounded square with icon
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" fill="url(#grad2)" rx="100"/>
          <rect x="80" y="80" width="352" height="352" fill="white" fill-opacity="0.2" rx="60"/>
          <text x="256" y="300" font-family="Arial Black, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
        </svg>
      `;
      break;
    case 2: // Hexagon style
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" fill="${bgColor}" rx="64"/>
          <polygon points="256,50 450,150 450,362 256,462 62,362 62,150" fill="url(#grad3)"/>
          <text x="256" y="290" font-family="Arial Black, sans-serif" font-size="160" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
        </svg>
      `;
      break;
    default: // Modern abstract
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" fill="url(#grad4)" rx="64"/>
          <circle cx="150" cy="150" r="80" fill="white" fill-opacity="0.3"/>
          <circle cx="362" cy="362" r="100" fill="white" fill-opacity="0.2"/>
          <text x="256" y="300" font-family="Arial Black, sans-serif" font-size="180" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
        </svg>
      `;
  }
  
  return svg;
}

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea || typeof idea !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid idea" },
        { status: 400 }
      );
    }

    // Generate SVG logo
    const svgContent = generateSVGLogo(idea.trim());
    
    // Convert SVG to base64 data URL
    const base64 = Buffer.from(svgContent).toString("base64");
    const dataUrl = `data:image/svg+xml;base64,${base64}`;

    return NextResponse.json({
      success: true,
      imageUrl: dataUrl,
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
