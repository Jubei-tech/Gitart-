"use client"

import { useState, useEffect } from "react"

export function TypewriterHeading() {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Build websites like you run "
  const highlightText = "commands"
  const [highlightDisplayed, setHighlightDisplayed] = useState("")
  const [phase, setPhase] = useState<"main" | "highlight" | "done">("main")

  useEffect(() => {
    if (phase === "main") {
      if (displayedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setPhase("highlight")
      }
    } else if (phase === "highlight") {
      if (highlightDisplayed.length < highlightText.length) {
        const timeout = setTimeout(() => {
          setHighlightDisplayed(highlightText.slice(0, highlightDisplayed.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        setPhase("done")
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 500)
      }
    }
  }, [displayedText, highlightDisplayed, phase])

  // Cursor blink effect
  useEffect(() => {
    if (phase !== "done") {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)
      return () => clearInterval(interval)
    }
  }, [phase])

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
      {displayedText}
      <span className="text-primary terminal-text">{highlightDisplayed}</span>
      {phase !== "done" && (
        <span 
          className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.1s' }}
        />
      )}
    </h1>
  )
}
