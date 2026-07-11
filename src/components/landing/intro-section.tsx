"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, LinkedIn, Discord, X } from "@/components/svg";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { FileText, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    label: "X (ambir513)",
    icon: X,
    href: "https://x.com/ambir513?utm_source=amarbiradar.me",
  },
  {
    label: "GitHub (ambir513)",
    icon: Github,
    href: "https://github.com/ambir513?utm_source=amarbiradar.me",
  },
  {
    label: "LinkedIn (ambir513)",
    icon: LinkedIn,
    href: "https://linkedin.com/in/ambir513?utm_source=amarbiradar.me",
  },
  {
    label: "Discord (ambir513)",
    icon: Discord,
    href: "https://discord.gg/udHD4639uk?utm_source=amarbiradar.me",
  },
  {
    label: "Email (amarbiradar147@gmail.com)",
    icon: Mail,
    href: "mailto:amarbiradar147@gmail.com",
  },
  {
    label: "Resume (amarbiradar.me/resume)",
    icon: FileText,
    href: "/resume",
  },
] as const;

export function IntroSection() {
  return (
    <section className="space-y-6 pt-20">
      <Avatar className="size-24 pointer-events-none">
        <AvatarImage src="/brand/logo.png" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <p className="text-xl font-bold">
        Hey <span className="wave inline-block">👋</span>, I'm Amar Biradar
        (AmBir)
      </p>
      <p className="text-muted-foreground">
        Full Stack Developer focused on building modern, fast, and user-friendly
        web applications. I specialize in React, Next.js, TypeScript, and
        Node.js, creating scalable digital products with clean code and great
        user experiences.
      </p>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map((link) => (
          <Tooltip key={link.label}>
            <TooltipTrigger
              render={
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={cn(
                    "p-1",
                    buttonVariants({
                      variant: "outline",
                      size: "icon-lg",
                    }),
                  )}
                />
              }
            >
              <link.icon />
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </section>
  );
}
