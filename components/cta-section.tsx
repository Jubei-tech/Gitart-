"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TerminalWindow, TerminalLine } from "./terminal-window"
import { TerminalModal } from "./terminal-modal"

export function CTASection() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to build your <span className="text-primary">website</span>?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Start building websites with terminal commands today. 
          No design skills needed. Just describe and deploy.
        </p>
        
        <TerminalWindow title="get started" className="max-w-lg mx-auto mb-8 text-left">
          <TerminalLine 
            command="npm install -g gitart" 
          />
          <TerminalLine 
            command="gitart"
          />
          <div className="mt-4 text-muted-foreground text-xs">
            <div>Welcome to Gitart.</div>
            <div>AI Website Builder on Base.</div>
            <div className="mt-2">
              <span className="text-foreground">Type:</span>
            </div>
            <div className="text-primary">gitart create &quot;your website idea&quot;</div>
          </div>
        </TerminalWindow>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setIsTerminalOpen(true)}
          >
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
            Read Documentation
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-6">
          Free to use. Deploy unlimited websites. Mint on Base.
        </p>
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </section>
  )
}
