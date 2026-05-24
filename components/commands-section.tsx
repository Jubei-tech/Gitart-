"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const commands = [
  {
    cmd: 'gitart create "idea"',
    desc: 'Create a new website from your idea'
  },
  {
    cmd: 'gitart preview',
    desc: 'Preview your generated website'
  },
  {
    cmd: 'gitart edit [section] "instruction"',
    desc: 'Edit sections with AI assistance'
  },
  {
    cmd: 'gitart add section "name"',
    desc: 'Add a new section to your website'
  },
  {
    cmd: 'gitart remove [section]',
    desc: 'Remove a section from your website'
  },
  {
    cmd: 'gitart theme "style"',
    desc: 'Apply a new theme to your website'
  },
  {
    cmd: 'gitart deploy',
    desc: 'Deploy your website live'
  },
  {
    cmd: 'gitart connect-base',
    desc: 'Connect your Base wallet'
  },
  {
    cmd: 'gitart mint',
    desc: 'Mint your project as NFT on Base'
  },
]

export function CommandsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          <span className="text-primary">Core</span> Commands
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Everything you need to build, customize, and deploy your website.
        </p>
        
        <div className="grid gap-3">
          {commands.map((command, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border border-border bg-card/50 transition-all duration-300",
                "hover:border-primary/50 hover:bg-card",
                hoveredIndex === index && "border-primary/50 bg-card"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <code className="text-primary font-mono text-sm md:text-base flex-shrink-0">
                  $ {command.cmd}
                </code>
                <span className="text-muted-foreground text-sm md:border-l md:border-border md:pl-4">
                  {command.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
