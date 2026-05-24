import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkflowSection } from "@/components/workflow-section"
import { FeaturesSection } from "@/components/features-section"
import { CommandsSection } from "@/components/commands-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WorkflowSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="commands">
        <CommandsSection />
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
