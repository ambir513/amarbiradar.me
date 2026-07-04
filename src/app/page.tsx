import { GithubActivitySection } from "@/components/landing/github-activity";
import { Header } from "@/components/landing/header";
import { IntroSection } from "@/components/landing/intro-section";
import { ProjectsSection } from "@/components/landing/projects";
import { AboutSection } from "@/components/landing/about";
import { Experience } from "@/components/landing/experience";
import { Footer } from "@/components/landing/footer";
import Script from "next/script";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://amarbiradar.me/#person",
    name: "Amar Biradar",
    alternateName: "AmBir",
    url: "https://amarbiradar.me",
    image: "https://amarbiradar.me/brand/logo.png",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and scalable web applications.",
    email: "mailto:amarbiradar147@gmail.com",
    nationality: "Indian",
    knowsLanguage: ["English", "Hindi", "Marathi", "Kannada"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Vidyavardhini's Annasaheb Vartak College",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "AWS",
      "Docker",
      "Tailwind CSS",
      "tRPC",
      "REST APIs",
      "Cloudinary",
      "Software Architecture",
      "Full Stack Development",
    ],
    sameAs: [
      "https://github.com/ambir513",
      "https://www.linkedin.com/in/ambir513",
      "https://x.com/ambir513",
      "https://www.instagram.com/ambir513",
      "https://www.youtube.com/@ambir513",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://amarbiradar.me/#website",
    url: "https://amarbiradar.me",
    name: "Amar Biradar",
    description: "Official portfolio of Amar Biradar.",
    publisher: {
      "@id": "https://amarbiradar.me/#person",
    },
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://amarbiradar.me/#webpage",
    url: "https://amarbiradar.me",
    name: "Amar Biradar | Full Stack Developer",
    description:
      "Portfolio showcasing projects, experience, skills, and resume of Amar Biradar.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://amarbiradar.me/#website",
    },
    about: {
      "@id": "https://amarbiradar.me/#person",
    },
    mainEntity: {
      "@id": "https://amarbiradar.me/#person",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://amarbiradar.me/#profile",
    url: "https://amarbiradar.me",
    mainEntity: {
      "@id": "https://amarbiradar.me/#person",
    },
    isPartOf: {
      "@id": "https://amarbiradar.me/#website",
    },
  },
];

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main className="max-w-5xl sm:mx-auto mx-5">
        <IntroSection />
        <Experience />
        <ProjectsSection />
        <AboutSection />
        <GithubActivitySection />
      </main>

      <Footer />
    </>
  );
}
