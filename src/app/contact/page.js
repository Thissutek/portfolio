"use client";

import ContactForm from "@/components/contact/ContactForm";
import { tokens } from "@/styles/theme";

export default function Contact() {
  return (
    <section
      className="relative min-h-[calc(100vh-70px)] flex items-start lg:items-center justify-center px-4 md:px-8 py-16 lg:py-24 overflow-hidden"
      style={{ background: tokens.bg }}
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 grid-overlay pointer-events-none opacity-60"
        aria-hidden
      />
      <div
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full ambient-glow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,190,254,0.20), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full ambient-glow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(250,179,135,0.16), transparent 60%)",
          animationDelay: "3s",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        <ContactForm />
      </div>
    </section>
  );
}
