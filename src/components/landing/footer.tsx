import Image from "next/image";
import {
  Github,
  Instagram,
  LinkedIn,
  X,
  YouTube,
} from "@/components/svg/index";
import { Separator } from "../ui/separator";
import { Mail } from "lucide-react";

const FOOTER_LINKS = [
  {
    name: "Payments",
    category: [
      { name: "ambir513@sbi", href: "upi://pay?pa=ambir513@sbi" },
      { name: "Paypal", href: "https://paypal.me/AmarBiradar871" },
      { name: "Razorpay", href: "https://razorpay.me/@amarbiradar" },
    ],
  },
  {
    name: "Connect",
    category: [
      { name: "Contact", href: "mailto:amarbiradar147@gmail.com" },
      { name: "Resume", href: "/resume" },
    ],
  },
];

// icon must be a component reference, not a rendered JSX element —
// <social.icon /> only works if social.icon is a function/component.
const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com/ambir513?utm_source=amarbiradar.me",
    icon: X,
  },
  {
    name: "GitHub",
    href: "https://github.com/ambir513?utm_source=amarbiradar.me",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ambir513?utm_source=amarbiradar.me",
    icon: LinkedIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ambir513?utm_source=amarbiradar.me",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@ambir513?utm_source=amarbiradar.me",
    icon: YouTube,
  },
  { name: "Email", href: "mailto:amarbiradar147@gmail.com", icon: Mail },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full mt-16">
      <Separator />
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        {/* Top section */}
        <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          {/* Brand */}
          <div className="flex max-w-xs flex-col items-center gap-4 sm:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="Amar Biradar"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-border"
                priority
              />
              <h2 className="text-lg font-bold tracking-tight">Amar Biradar</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Building products &amp; solving real&#8209;world problems, one
              commit at a time.
            </p>

            {/* Social icons */}
            <div className="flex gap-1 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <social.icon className="size-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — grid, not fixed-gap flex, so it never overflows on narrow screens */}
          <div className="grid w-full grid-cols-2 gap-8 sm:w-auto sm:gap-16">
            {FOOTER_LINKS.map((group) => (
              <div
                key={group.name}
                className="flex flex-col items-center gap-3 sm:items-start"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.name}
                </h3>
                <ul className="flex flex-col items-center gap-2.5 sm:items-start">
                  {group.category.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8" />
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            Built with <span className="text-red-500">&#10084;</span> by{" "}
            <span className="font-medium text-foreground">AmBir</span>
          </p>
          <p>© {CURRENT_YEAR} Amar Biradar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
