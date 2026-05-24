"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">Gitart</span>
            <span className="text-xs text-muted-foreground">Build websites like you run commands.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>Built on Base. Powered by AI.</p>
        </div>
      </div>
    </footer>
  )
}
