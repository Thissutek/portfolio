import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Sidebar";
import { tokens } from "@/styles/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Jonathan Yau · Developer / Dancer / Creator",
  description:
    "Full-stack developer with a creative foundation in animation and a decade in dance — building cinematic, expressive software.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
        style={{ backgroundColor: tokens.bg, color: tokens.fg }}
      >
        <Navbar />
        <main
          className="relative"
          style={{ paddingTop: "70px", minHeight: "100vh" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
