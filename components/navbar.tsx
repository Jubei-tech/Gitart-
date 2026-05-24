"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl">Gitart</span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">on Base</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#commands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Commands
          </Link>
        </div>
        
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Get Started
        </Button>
      </div>
    </nav>
  )
}
