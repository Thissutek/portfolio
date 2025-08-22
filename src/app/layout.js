"use client";

import { Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
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
        <Sidebar />
        <main 
          className="relative"
          style={{ 
            paddingTop: '70px', // Account for fixed navbar height
            minHeight: '100vh',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
