"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Posts" },
  { href: "/new", label: "New Post Idea" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/post-ideas/");
  }

  return pathname === href;
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="navlinks" aria-label="Primary">
      {links.map((link) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`pill${active ? " pill-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
