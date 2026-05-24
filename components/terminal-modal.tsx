"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalLine {
  text: string;
  type: "system" | "command" | "success" | "info" | "header" | "section" | "detail" | "image";
  delay?: number;
  imageUrl?: string;
}

export function TerminalModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [currentTypingLine, setCurrentTypingLine] = useState<number>(-1);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const initialLines: TerminalLine[] = [
    { text: "Welcome to Gitart.", type: "header" },
    { text: "AI Website Builder on Base.", type: "info" },
    { text: "", type: "system" },
    { text: "Type:", type: "system" },
    { text: 'gitart create "your website idea"', type: "command" },
    { text: 'gitart create logo "your website idea"', type: "command" },
  ];

  useEffect(() => {
    if (isOpen) {
      setLines(initialLines);
      setInputValue("");
      setIsGenerating(false);
      setShowInput(true);
      setCurrentTypingLine(-1);
      setDisplayedText("");
      setIsComplete(false);
      setGeneratedLogo(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, displayedText]);

  const generateOutput = useCallback((idea: string) => {
    const outputLines: TerminalLine[] = [
      { text: "", type: "system", delay: 300 },
      { text: "⠋ Initializing Gitart...", type: "info", delay: 400 },
      { text: "⠙ Connecting to Base network...", type: "info", delay: 500 },
      { text: "⠹ Validating project configuration...", type: "info", delay: 400 },
      { text: "", type: "system", delay: 200 },
      { text: "✓ Project created", type: "success", delay: 300 },
      { text: "✓ Hero generated", type: "success", delay: 250 },
      { text: "✓ Tokenomics generated", type: "success", delay: 250 },
      { text: "✓ Roadmap generated", type: "success", delay: 250 },
      { text: "✓ Community section generated", type: "success", delay: 250 },
      { text: "✓ Base wallet CTA added", type: "success", delay: 300 },
      { text: "", type: "system", delay: 200 },
      { text: "Run:", type: "system", delay: 150 },
      { text: "  gitart preview", type: "command", delay: 100 },
      { text: "  gitart edit", type: "command", delay: 100 },
      { text: "  gitart deploy", type: "command", delay: 100 },
      { text: "", type: "system", delay: 200 },
      { text: `PROJECT: ${idea}`, type: "section", delay: 150 },
      { text: "CHAIN: Base", type: "section", delay: 100 },
      { text: `TYPE: ${idea}`, type: "section", delay: 100 },
      { text: "", type: "system", delay: 200 },
      { text: "[Hero]", type: "header", delay: 150 },
      { text: `  Title: ${idea}`, type: "detail", delay: 100 },
      { text: "  CTA: Buy on Base", type: "detail", delay: 100 },
      { text: "", type: "system", delay: 150 },
      { text: "[Tokenomics]", type: "header", delay: 150 },
      { text: "  Supply: 1B", type: "detail", delay: 100 },
      { text: "  Tax: 0%", type: "detail", delay: 100 },
      { text: "  Liquidity: Locked", type: "detail", delay: 100 },
      { text: "", type: "system", delay: 150 },
      { text: "[Roadmap]", type: "header", delay: 150 },
      { text: "  Phase 1: Launch", type: "detail", delay: 100 },
      { text: "  Phase 2: Community", type: "detail", delay: 100 },
      { text: "  Phase 3: Base ecosystem", type: "detail", delay: 100 },
      { text: "", type: "system", delay: 200 },
      { text: "✓ Website ready!", type: "success", delay: 300 },
      { text: 'Run "gitart deploy" to publish on Base', type: "info", delay: 200 },
    ];

    return outputLines;
  }, []);

  const typeLineByLine = useCallback(async (outputLines: TerminalLine[]) => {
    for (let i = 0; i < outputLines.length; i++) {
      const line = outputLines[i];
      setCurrentTypingLine(i);
      
      // Type each character
      const text = line.text;
      for (let j = 0; j <= text.length; j++) {
        setDisplayedText(text.slice(0, j));
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
      
      // Add completed line
      setLines((prev) => [...prev, line]);
      setDisplayedText("");
      
      // Wait before next line
      await new Promise((resolve) => setTimeout(resolve, line.delay || 100));
    }
    setCurrentTypingLine(-1);
    setIsGenerating(false);
    setIsComplete(true);
  }, []);

  const generateLogoWithAPI = useCallback(async (idea: string) => {
    const loadingLines: TerminalLine[] = [
      { text: "", type: "system", delay: 300 },
      { text: "⠋ Initializing logo generation...", type: "info", delay: 400 },
      { text: "⠙ Connecting to OpenAI DALL-E...", type: "info", delay: 500 },
      { text: "⠹ Creating cartoon-style logo...", type: "info", delay: 400 },
    ];

    // Show loading lines first
    for (const line of loadingLines) {
      setLines((prev) => [...prev, line]);
      await new Promise((resolve) => setTimeout(resolve, line.delay || 100));
    }

    try {
      const response = await fetch("/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate logo");
      }

      setGeneratedLogo(data.imageUrl);

      const successLines: TerminalLine[] = [
        { text: "", type: "system", delay: 200 },
        { text: "✓ Logo generated successfully!", type: "success", delay: 300 },
        { text: `✓ Style: Cartoon/Mascot`, type: "success", delay: 200 },
        { text: `✓ Theme: ${idea}`, type: "success", delay: 200 },
        { text: "", type: "system", delay: 200 },
        { text: "Logo Preview:", type: "header", delay: 150 },
        { text: data.imageUrl, type: "image", imageUrl: data.imageUrl, delay: 100 },
        { text: "", type: "system", delay: 200 },
        { text: "Run:", type: "system", delay: 150 },
        { text: "  gitart download-logo", type: "command", delay: 100 },
        { text: "  gitart apply-logo", type: "command", delay: 100 },
      ];

      for (const line of successLines) {
        setLines((prev) => [...prev, line]);
        await new Promise((resolve) => setTimeout(resolve, line.delay || 100));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setLines((prev) => [
        ...prev,
        { text: "", type: "system" },
        { text: `✗ Error: ${errorMessage}`, type: "info" },
        { text: "Please try again.", type: "info" },
      ]);
    }

    setIsGenerating(false);
    setIsComplete(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for logo creation command first
    const logoMatch = inputValue.match(/gitart\s+create\s+logo\s+["'](.+?)["']/i);
    if (logoMatch) {
      const idea = logoMatch[1];
      setShowInput(false);
      setIsGenerating(true);
      
      setLines((prev) => [
        ...prev,
        { text: "", type: "system" },
        { text: `$ gitart create logo "${idea}"`, type: "command" },
      ]);

      generateLogoWithAPI(idea);
      setInputValue("");
      return;
    }
    
    const match = inputValue.match(/gitart\s+create\s+["'](.+?)["']/i);
    if (!match) {
      setLines((prev) => [
        ...prev,
        { text: "", type: "system" },
        { text: `$ ${inputValue}`, type: "command" },
        { text: 'Error: Invalid command. Use:', type: "info" },
        { text: '  gitart create "your idea"', type: "command" },
        { text: '  gitart create logo "your idea"', type: "command" },
      ]);
      setInputValue("");
      return;
    }

    const idea = match[1];
    setShowInput(false);
    setIsGenerating(true);
    
    setLines((prev) => [
      ...prev,
      { text: "", type: "system" },
      { text: `$ gitart create "${idea}"`, type: "command" },
    ]);

    const outputLines = generateOutput(idea);
    typeLineByLine(outputLines);
    setInputValue("");
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "header":
        return "text-primary font-bold";
      case "success":
        return "text-primary";
      case "command":
        return "text-[oklch(0.55_0.25_200)]";
      case "section":
        return "text-[oklch(0.85_0.15_90)]";
      case "detail":
        return "text-muted-foreground";
      case "info":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl">
        {/* Terminal Window */}
        <div className="rounded-lg border border-border bg-[oklch(0.08_0.005_270)] shadow-2xl overflow-hidden terminal-glow">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[oklch(0.12_0.01_270)] border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-3 text-xs text-muted-foreground">
                user@gitart — ~/projects
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-4 h-[400px] overflow-y-auto font-mono text-sm relative scanline"
          >
            <div className="crt-overlay" />
            
            {/* Rendered lines */}
            {lines.map((line, index) => (
              <div key={index} className={`${getLineColor(line.type)} leading-relaxed`}>
                {line.type === "image" && line.imageUrl ? (
                  <div className="my-3">
                    <img 
                      src={line.imageUrl} 
                      alt="Generated logo" 
                      className="w-32 h-32 rounded-lg border border-border object-cover"
                    />
                  </div>
                ) : (
                  line.text || "\u00A0"
                )}
              </div>
            ))}

            {/* Currently typing line */}
            {currentTypingLine >= 0 && (
              <div className={`${getLineColor(generateOutput("")[currentTypingLine]?.type || "system")} leading-relaxed`}>
                {displayedText}
                <span className="typing-cursor" />
              </div>
            )}

            {/* GitHub push message */}
            {isComplete && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <span className="text-primary">Ready to deploy!</span>
                  <span className="text-muted-foreground">Push to GitHub to continue</span>
                </div>
                <div className="mt-3">
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <a 
                      href="https://github.com/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      Push to GitHub
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {/* Input */}
            {showInput && !isGenerating && (
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-primary mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                  placeholder='gitart create "my awesome project"'
                  autoFocus
                />
                <span className="typing-cursor" />
              </form>
            )}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Enter</kbd> to execute command
        </p>
      </div>
    </div>
  );
}
