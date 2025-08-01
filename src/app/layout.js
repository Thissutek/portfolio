"use client";

import { Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import ParticleSystem from "@/components/home/ParticleSystem";
import { colors, styles } from "@/styles/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: colors.base }}
      >
        <div className={styles.container}>
          {/* Global Particle System Background */}
          <div className="fixed inset-0" style={{ zIndex: -10 }}>
            <ParticleSystem />
          </div>
          
          <Sidebar />
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
