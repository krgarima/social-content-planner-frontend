import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Social Content Planner",
  description: "Plan social posts, track progress, and explore hashtag ideas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <Link href="/" className="brand">
              Social Content Planner
            </Link>
            <nav className="navlinks">
              <Link href="/" className="pill">
                Posts
              </Link>
              <Link href="/new" className="pill">
                New Post Idea
              </Link>
              <Link href="/dashboard" className="pill">
                Dashboard
              </Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
