"use client";

import React from "react";
import { ThemeToggleBtn } from "@/components/landing/theme-toggle-btn";
import { Button } from "../ui/button";
import { ChevronLeft, CornerLeftDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Types

interface NavLink {
  label: string;
  href: string;
}

// Constants

const NAV_LINKS: NavLink[] = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

// Helpers

function scrollToSection(href: string): void {
  const target = document.querySelector(href);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}

// Sub-components

function NavItem({ label, href }: NavLink) {
  return (
    <li>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => scrollToSection(href)}
        className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <CornerLeftDown
          className="inline size-3 sm:opacity-0 opacity- -translate-y-0.5 transition-all duration-200 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
          aria-hidden="true"
        />
        {label}
      </Button>
    </li>
  );
}

// Header

export function Header() {
  const pathname = usePathname();

  const isResumePage = pathname.startsWith("/resume");

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border/40">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-end gap-4 px-4">
        <nav aria-label="Site navigation">
          {isResumePage ? (
            <Button variant="secondary">
              <Link href="/" className="flex items-center gap-1">
                <ChevronLeft />
                <span>Back to Portfolio</span>
              </Link>
            </Button>
          ) : (
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.href} {...link} />
              ))}
            </ul>
          )}
        </nav>

        <div
          className="sm:block hidden h-5 w-px bg-border"
          aria-hidden="true"
        />

        <ThemeToggleBtn />
      </div>
    </header>
  );
}
