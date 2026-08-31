import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import AnalyticsHUD from "@/components/AnalyticsHUD";
import TerminalCLI from "@/components/TerminalCLI";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhiral Jain | Creative Full-Stack Developer & ML Engineer",
  description: "Personal portfolio of Abhiral Jain, featuring high-end web designs, full-stack systems, and machine learning models with sub-200ms inference.",
  keywords: ["Abhiral Jain", "Developer Portfolio", "Full Stack Developer", "Machine Learning Engineer", "Next.js", "Three.js", "GSAP Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} font-sans bg-[#0b0b0c] text-[#f5f5f7] antialiased selection:bg-accent selection:text-black`}
      >
        <SmoothScroll>
          <CustomCursor />
          <AnalyticsHUD />
          <TerminalCLI />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
