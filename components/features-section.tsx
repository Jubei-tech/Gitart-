"use client"

import { cn } from "@/lib/utils"

const features = [
  {
    icon: "⚡",
    title: "AI-Powered Generation",
    description: "Describe your website idea and AI generates complete website structure with all sections."
  },
  {
    icon: "🔗",
    title: "Built on Base",
    description: "Native Base blockchain integration with wallet connect and NFT minting support."
  },
  {
    icon: "💻",
    title: "Terminal Interface",
    description: "Build websites like you run commands. No preview needed - pure terminal workflow."
  },
  {
    icon: "🎨",
    title: "Theme Commands",
    description: "Apply themes with simple commands. Dark neon terminal? Cyberpunk? Just type it."
  },
  {
    icon: "🚀",
    title: "Instant Deploy",
    description: "Deploy your website with a single command. Get a live URL in seconds."
  },
  {
    icon: "🎫",
    title: "Mint as NFT",
    description: "Turn your website project into an NFT on Base. Own your creation onchain."
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Why <span className="text-primary">Gitart</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          The future of website building is here. No more drag and drop.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-lg border border-border bg-card/50",
                "hover:border-primary/30 hover:bg-card transition-all duration-300"
              )}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
