"use client";

import HeroSection from "@/components/landing/HeroSection";
import TrustBannerStrip from "@/components/landing/TrustBannerStrip";
import BrandsStrip from "@/components/landing/BrandsStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import ServicesPreview from "@/components/landing/ServicesPreview";
import PortfolioSection from "@/components/landing/PortfolioSection";
import ExpertSection from "@/components/landing/ExpertSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import ContactSection from "@/components/landing/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBannerStrip />
      <BrandsStrip />
      <HowItWorks />
      <ServicesPreview />
      <PortfolioSection />
      <ExpertSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
