import { AnimatedBackground } from "@/components/landing/animated-background";
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { SecurityStrip } from "@/components/landing/security-strip";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <LandingNav />
        <main>
          <HeroSection />
          <FeatureGrid />
          <SecurityStrip />
          <CtaSection />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
