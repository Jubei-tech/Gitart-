"use client"

import { cn } from "@/lib/utils"

const workflowSteps = [
  {
    step: "01",
    title: "Create",
    command: 'gitart create "your idea"',
    description: "Describe your website idea and AI generates the complete structure with Hero, Tokenomics, Roadmap, and more.",
    preview: `PROJECT: Based Pepe
CHAIN: Base
TYPE: Meme Coin Landing

[Hero]
Title: Based Pepe is going onchain
CTA: Buy on Base`,
  },
  {
    step: "02",
    title: "Customize",
    command: 'gitart edit hero "cyberpunk style"',
    description: "Edit any section with natural language commands. Add, remove, or modify sections instantly.",
    preview: `✓ Hero updated

[Hero]
Title: Based Pepe enters the cyberchain
Subtitle: A meme coin born on Base
CTA: Launch on Base`,
  },
  {
    step: "03",
    title: "Deploy",
    command: 'gitart deploy',
    description: "Deploy your website instantly. Connect your Base wallet and mint your project as NFT.",
    preview: `Building project...
Uploading files...

✓ Deployment successful

URL: https://basedpepe.gitart.app`,
  },
]

export function WorkflowSection() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          How It <span className="text-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Three simple steps to go from idea to live website.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {workflowSteps.map((item, index) => (
            <div key={index} className="relative">
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              
              <div className="mb-4">
                <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                  $ {item.command}
                </code>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              
              <div className="rounded-lg border border-border bg-card p-4">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {item.preview}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
