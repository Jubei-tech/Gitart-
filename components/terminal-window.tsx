"use client"

import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  username?: string
  hostname?: string
  path?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ 
  title, 
  username = "user",
  hostname = "gitart",
  path = "~/projects",
  children, 
  className 
}: TerminalWindowProps) {
  const displayTitle = title || `${username}@${hostname} — ${path}`
  
  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden terminal-glow", className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{displayTitle}</span>
      </div>
      <div className="p-4 text-sm leading-relaxed scanline relative">
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
  info?: boolean
  url?: boolean
  progress?: string
}

export function TerminalLine({ 
  prompt = ">", 
  command, 
  output, 
  success, 
  typing,
  info,
  url,
  progress
}: TerminalLineProps) {
  return (
    <div className="mb-1">
      {command && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{prompt}</span>
          <span className={cn("text-foreground", typing && "typing-cursor")}>{command}</span>
        </div>
      )}
      {output && (
        <div className={cn(
          "flex items-start gap-2",
          success === true && "text-primary",
          success === false && "text-destructive",
          info && "text-muted-foreground",
          url && "text-accent"
        )}>
          {progress && <span className="text-muted-foreground">{progress}</span>}
          <span>{output}</span>
        </div>
      )}
    </div>
  )
}
