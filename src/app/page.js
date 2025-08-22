"use client";
import HeroSection from "../components/home/HeroSection";
import PortfolioShowcase from "../components/home/PortfolioShowcase";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />

      <PortfolioShowcase />
    </div>
  );
}
