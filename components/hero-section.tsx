"use client"

import { Button } from "@/components/ui/button"
import { TypewriterDemo } from "./typewriter-demo"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden scanline">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Terminal-style AI Website Builder
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
          Build websites like you run{' '}
          <span className="text-primary terminal-text">commands</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Gitart is a terminal-style AI website builder on Base. No preview needed. 
          Create, edit, and deploy websites entirely through commands.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <span className="text-primary-foreground/70">$</span>
            gitart start
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
            View Demo
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <code className="bg-secondary px-3 py-1 rounded">$ npm install -g gitart</code>
        </div>
      </div>
      
      <div id="demo" className="relative z-10 w-full max-w-2xl mx-auto">
        <TypewriterDemo />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
