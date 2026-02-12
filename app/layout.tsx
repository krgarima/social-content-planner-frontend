import type { Metadata } from "next";
import Link from "next/link";
import { Source_Sans_3, Space_Grotesk } from "next/font/google";
import { TopNav } from "@/components/top-nav";

import "@/app/globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Social Content Planner",
  description: "Plan social posts, track progress, and explore hashtag ideas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <div className="shell">
          <header className="topbar">
            <div className="brand-wrap">
              <Link href="/" className="brand">
                Social Content Planner
              </Link>
              <p className="brand-subtitle">Build, track, and refine social ideas.</p>
            </div>
            <TopNav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
