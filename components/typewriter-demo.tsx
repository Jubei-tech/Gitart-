"use client"

import { useState, useEffect, useCallback } from "react"
import { TerminalWindow, TerminalLine } from "./terminal-window"
import { cn } from "@/lib/utils"

interface TypewriterDemoProps {
  className?: string
}

interface DemoLine {
  command?: string
  output?: string
  success?: boolean
  info?: boolean
  url?: boolean
  progress?: string
  blank?: boolean
  delay: number
  typeSpeed?: number
}

const demoLines: DemoLine[] = [
  { command: 'gitart init', delay: 100, typeSpeed: 50 },
  { output: 'Gitart v1.0.0 — AI website builder terminal', info: true, delay: 400 },
  { output: 'Connected to Base mainnet ✓', success: true, delay: 300 },
  { blank: true, delay: 200 },
  { command: 'create --name "BasedMeme" --template meme-coin', delay: 600, typeSpeed: 40 },
  { output: 'Validating parameters...', progress: '[1/4]', info: true, delay: 400 },
  { output: 'Generating with AI...', progress: '[2/4]', info: true, delay: 500 },
  { output: 'Creating project structure...', progress: '[3/4]', info: true, delay: 400 },
  { output: 'Applying theme...', progress: '[4/4]', info: true, delay: 400 },
  { output: '✓ Project created successfully!', success: true, delay: 500 },
  { blank: true, delay: 200 },
  { output: 'Preview: http://localhost:3000', info: true, delay: 100 },
  { blank: true, delay: 400 },
  { command: 'deploy --network base', delay: 600, typeSpeed: 45 },
  { output: 'Building project...', progress: '[1/3]', info: true, delay: 500 },
  { output: 'Uploading to IPFS...', progress: '[2/3]', info: true, delay: 600 },
  { output: 'Registering on Base...', progress: '[3/3]', info: true, delay: 500 },
  { output: '✓ Deployed successfully!', success: true, delay: 400 },
  { blank: true, delay: 200 },
  { output: 'URL: https://basedmeme.gitart.app', url: true, delay: 100 },
  { output: 'IPFS: ipfs://Qm7x...3f2a', info: true, delay: 0 },
]

export function TypewriterDemo({ className }: TypewriterDemoProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
  const [currentText, setCurrentText] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [completedLines, setCompletedLines] = useState<DemoLine[]>([])

  const typeCommand = useCallback((command: string, speed: number = 50) => {
    setIsTyping(true)
    setCurrentText("")
    let charIndex = 0
    
    const typeChar = () => {
      if (charIndex < command.length) {
        setCurrentText(command.slice(0, charIndex + 1))
        charIndex++
        setTimeout(typeChar, speed + Math.random() * 30)
      } else {
        setIsTyping(false)
      }
    }
    
    typeChar()
  }, [])

  useEffect(() => {
    if (currentLineIndex >= demoLines.length) {
      // Reset and loop
      const timer = setTimeout(() => {
        setCurrentLineIndex(0)
        setCompletedLines([])
        setCurrentText("")
      }, 3000)
      return () => clearTimeout(timer)
    }

    const currentLine = demoLines[currentLineIndex]

    if (currentLine.command && !isTyping && currentText !== currentLine.command) {
      // Start typing the command
      typeCommand(currentLine.command, currentLine.typeSpeed)
      return
    }

    if (currentLine.command && !isTyping && currentText === currentLine.command) {
      // Command finished typing, add to completed and move to next
      const timer = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine])
        setCurrentText("")
        setCurrentLineIndex(prev => prev + 1)
      }, 200)
      return () => clearTimeout(timer)
    }

    if (!currentLine.command) {
      // Non-command line, just add after delay
      const timer = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine])
        setCurrentLineIndex(prev => prev + 1)
      }, currentLine.delay)
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, isTyping, currentText, typeCommand])

  return (
    <TerminalWindow 
      username="user" 
      hostname="gitart" 
      path="~/projects/new"
      className={cn("max-w-2xl mx-auto", className)}
    >
      <div className="min-h-[360px]">
        {completedLines.map((line, index) => {
          if (line.blank) {
            return <div key={index} className="h-3" />
          }
          if (line.command) {
            return <TerminalLine key={index} command={line.command} />
          }
          if (line.url) {
            return (
              <TerminalLine 
                key={index} 
                output={line.output} 
                url
              />
            )
          }
          return (
            <TerminalLine 
              key={index} 
              output={line.output} 
              success={line.success}
              info={line.info}
              progress={line.progress}
            />
          )
        })}
        
        {/* Current typing line */}
        {currentLineIndex < demoLines.length && demoLines[currentLineIndex].command && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-muted-foreground">{">"}</span>
            <span className="text-foreground">{currentText}</span>
            <span className="typing-cursor" />
          </div>
        )}
        
        {/* Waiting cursor when not typing */}
        {currentLineIndex < demoLines.length && !demoLines[currentLineIndex].command && !isTyping && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{">"}</span>
            <span className="typing-cursor" />
          </div>
        )}
      </div>
    </TerminalWindow>
  )
}
