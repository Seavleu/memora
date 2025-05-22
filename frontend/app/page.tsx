import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { CTASection } from '@/components/landing/cta-section';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


