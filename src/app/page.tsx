import { GithubActivitySection } from "@/components/landing/github-activity";
import { Header } from "@/components/landing/header";
import { IntroSection } from "@/components/landing/intro-section";
import { ProjectsSection } from "@/components/landing/projects";
import { AboutSection } from "@/components/landing/about";
import { Experience } from "@/components/landing/experience";
import { Footer } from "@/components/landing/footer";
import Script from "next/script";

const BASE_URL = "https://amarbiradar.me";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Amar Biradar",
      description:
        "Official portfolio of Amar Biradar, Full Stack Software Developer.",
      inLanguage: "en-IN",
      publisher: {
        "@id": `${BASE_URL}/#person`,
      },
    },

    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Amar Biradar",
      givenName: "Amar",
      familyName: "Biradar",
      alternateName: ["AmBir", "ambir513"],

      url: BASE_URL,

      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/logo.png`,
      },

      email: "mailto:amarbiradar147@gmail.com",

      nationality: "Indian",

      jobTitle: "Full Stack Software Developer",

      description:
        "Full Stack Software Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, scalable SaaS platforms, cloud infrastructure, and modern web applications.",

      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },

      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },

      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Software Developer",
      },

      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Vidyavardhini's Annasaheb Vartak College",
      },

      knowsLanguage: ["English", "Hindi", "Marathi", "Kannada"],

      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "AWS",
        "Docker",
        "Tailwind CSS",
        "REST APIs",
        "Authentication",
        "JWT",
        "Cloudinary",
        "System Design",
        "Software Architecture",
        "Performance Optimization",
        "Full Stack Development",
        "Frontend Development",
        "Backend Development",
        "SaaS Development",
      ],

      sameAs: [
        "https://github.com/ambir513",
        "https://www.linkedin.com/in/ambir513",
        "https://x.com/ambir513",
        "https://www.instagram.com/ambir513",
        "https://www.youtube.com/@ambir513",
      ],

      subjectOf: {
        "@type": "DigitalDocument",
        "@id": `${BASE_URL}/assets/resume.pdf`,
        url: `${BASE_URL}/assets/resume.pdf`,
        name: "Amar Biradar Resume",
        encodingFormat: "application/pdf",
      },
    },

    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Amar Biradar | Full Stack Software Developer",
      description:
        "Official portfolio of Amar Biradar showcasing projects, professional experience, technical skills, resume, GitHub activity, and contact information.",

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },

      about: {
        "@id": `${BASE_URL}/#person`,
      },

      mainEntity: {
        "@id": `${BASE_URL}/#person`,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/og.png`,
      },

      breadcrumb: {
        "@id": `${BASE_URL}/#breadcrumb`,
      },
    },

    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profile`,
      url: BASE_URL,

      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },

      about: {
        "@id": `${BASE_URL}/#person`,
      },

      mainEntity: {
        "@id": `${BASE_URL}/#person`,
      },

      inLanguage: "en-IN",
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
    },
  ],
};

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
