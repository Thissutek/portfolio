"use client";
import HeroSection from "../components/home/HeroSection";
import PortfolioShowcase from "../components/home/PortfolioShowcase";
import UniqueValueSection from "../components/home/UniqueValueSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <UniqueValueSection />
      <PortfolioShowcase />
    </div>
  );
}
