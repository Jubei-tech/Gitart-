"use client"

import { useState, useEffect } from "react"
import { TerminalWindow, TerminalLine } from "./terminal-window"
import { cn } from "@/lib/utils"

interface TypewriterDemoProps {
  className?: string
}

const demoLines = [
  { command: 'gitart create "Base meme coin landing page"', delay: 100 },
  { output: '✓ Project created', success: true, delay: 500 },
  { output: '✓ Hero generated', success: true, delay: 200 },
  { output: '✓ Tokenomics generated', success: true, delay: 200 },
  { output: '✓ Roadmap generated', success: true, delay: 200 },
  { output: '✓ Community section generated', success: true, delay: 200 },
  { output: '✓ Base wallet CTA added', success: true, delay: 200 },
  { blank: true, delay: 300 },
  { command: 'gitart theme "dark cyberpunk"', delay: 800 },
  { output: '✓ Theme updated', success: true, delay: 400 },
  { blank: true, delay: 300 },
  { command: 'gitart deploy', delay: 800 },
  { output: 'Building project...', delay: 300 },
  { output: 'Uploading files...', delay: 400 },
  { output: 'Deploying website...', delay: 500 },
  { blank: true, delay: 200 },
  { output: '✓ Deployment successful', success: true, delay: 300 },
  { blank: true, delay: 100 },
  { output: 'URL: https://basedpepe.gitart.app', url: true, delay: 0 },
]

export function TypewriterDemo({ className }: TypewriterDemoProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    if (visibleLines >= demoLines.length) return

    const currentLine = demoLines[visibleLines]
    const delay = currentLine.delay || 300

    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [visibleLines])

  return (
    <TerminalWindow title="gitart demo" className={cn("max-w-2xl mx-auto", className)}>
      <div className="min-h-[320px]">
        {demoLines.slice(0, visibleLines).map((line, index) => {
          if (line.blank) {
            return <div key={index} className="h-4" />
          }
          if (line.command) {
            return <TerminalLine key={index} command={line.command} />
          }
          if (line.url) {
            return (
              <div key={index} className="ml-4 mt-1">
                <span className="text-muted-foreground">URL: </span>
                <span className="text-accent underline">{line.output?.toString().replace('URL: ', '')}</span>
              </div>
            )
          }
          return <TerminalLine key={index} output={line.output} success={line.success} />
        })}
        {visibleLines < demoLines.length && (
          <div className="flex items-center gap-2">
            <span className="text-primary">$</span>
            <span className="typing-cursor" />
          </div>
        )}
      </div>
    </TerminalWindow>
  )
}
