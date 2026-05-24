"use client"

import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden terminal-glow", className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
      </div>
      <div className="p-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

interface TerminalLineProps {
  prompt?: string
  command?: string
  output?: React.ReactNode
  success?: boolean
  typing?: boolean
  delay?: number
}

export function TerminalLine({ prompt = "$", command, output, success, typing }: TerminalLineProps) {
  return (
    <div className="mb-2">
      {command && (
        <div className="flex items-center gap-2">
          <span className="text-primary">{prompt}</span>
          <span className={cn("text-foreground", typing && "typing-cursor")}>{command}</span>
        </div>
      )}
      {output && (
        <div className={cn(
          "ml-4 mt-1",
          success === true && "text-primary",
          success === false && "text-destructive"
        )}>
          {output}
        </div>
      )}
    </div>
  )
}
