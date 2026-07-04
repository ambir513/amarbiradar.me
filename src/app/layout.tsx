import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Viewport, Metadata } from "next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Amar Biradar - Full Stack Developer",
    template: "%s - Amar Biradar",
  },
  description:
    "Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, and scalable web applications.",
  keywords: [
    "Amar Biradar",
    "Amar Vishwanath Biradar",
    "AmBir",
    "ambir513",
    "Amar Biradar Portfolio",
    "ambir portfolio",
    "Amar Biradar Website",
    "Full Stack Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Tailwind CSS",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    title: "Amar Biradar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, and scalable web applications.",
    url: "https://amarbiradar.me",
    siteName: "Amar Biradar",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: "Amar Biradar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amar Biradar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js and scalable web applications.",
    images: ["/brand/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [
    {
      name: "Amar Biradar",
      url: "https://amarbiradar.me",
    },
  ],
  creator: "Amar Biradar",
  publisher: "Amar Biradar",
  category: "technology",
  applicationName: "Amar Biradar",
  alternates: {
    canonical: "https://amarbiradar.me",
  },
  verification: {
    google: "TWW6us4BMLQxudfjpBQDZXAQ_TrRX8EnO28axNdMufg",
  },
  metadataBase: new URL("https://amarbiradar.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S4T5BEQP7Y"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S4T5BEQP7Y');
        `}
      </Script>

      <body className="min-h-full flex flex-col bg-secondary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
