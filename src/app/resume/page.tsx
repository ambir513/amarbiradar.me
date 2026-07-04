import React from "react";
import { ResumePage } from "@/components/resume/components/resume-page";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Amar Biradar, Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and scalable web applications.",
  alternates: {
    canonical: "https://amarbiradar.me/resume",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Resume - Amar Biradar",
    description:
      "Resume of Amar Biradar, Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and scalable web applications",
    url: "https://amarbiradar.me/resume",
    type: "profile",
    images: [
      {
        url: "/brand/resume-og.png",
        width: 1200,
        height: 630,
        alt: "Amar Biradar Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Amar Biradar",
    description:
      "Resume of Amar Biradar, Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and scalable web applications",
    images: ["/brand/resume-og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://amarbiradar.me/resume#profile",
  url: "https://amarbiradar.me/resume",
  name: "Resume | Amar Biradar",
  mainEntity: {
    "@type": "Person",
    "@id": "https://amarbiradar.me/#person",
    name: "Amar Biradar",
    jobTitle: "Full Stack Developer",
    url: "https://amarbiradar.me",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and scalable web applications.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    sameAs: [
      "https://github.com/ambir513",
      "https://www.linkedin.com/in/ambir513",
      "https://x.com/ambir513",
      "https://www.instagram.com/ambir513",
      "https://www.youtube.com/@ambir513",
    ],
    email: "mailto:amarbiradar147@gmail.com",
    image: "https://amarbiradar.me/brand/logo.png",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    nationality: "Indian",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Vidyavardhini's Annasaheb Vartak College",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vasai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    knowsLanguage: ["English", "Hindi", "Marathi", "Kannada"],
  },
};
export default function ResumePageWrapper() {
  return (
    <>
      <Script
        id="resume-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <div className="sr-only">
        <h1>Amar Biradar Resume</h1>

        <p>
          Amar Biradar is a Full Stack Software Developer from Mumbai, India,
          specializing in building scalable web applications using Next.js,
          React, TypeScript, Node.js, PostgreSQL, Redis, AWS, Docker, and modern
          frontend technologies. He focuses on SaaS applications, developer
          tools, e-commerce platforms, AI applications, video streaming systems,
          learning management systems, and production-ready web platforms.
        </p>

        <h2>Professional Summary</h2>

        <p>
          Full Stack Software Developer experienced in designing, developing,
          deploying, and maintaining responsive web applications. Skilled in
          frontend architecture, backend APIs, authentication, database design,
          cloud deployment, and modern UI development using React and Next.js.
          Passionate about performance optimization, scalable architectures,
          reusable component systems, and developer experience.
        </p>

        <h2>Work Experience</h2>

        <p>
          Worked as Junior Software Developer Intern at I-Digitech Skills and
          Solution where responsibilities included designing responsive user
          interfaces, implementing secure JWT authentication, building scalable
          RESTful APIs, backend development, routing systems, API testing using
          Postman, and improving application security and performance.
        </p>

        <h2>Projects</h2>

        <p>
          Developed YTCN, a production-ready ShadCN Component Registry allowing
          developers to discover and install reusable React components using the
          shadcn CLI. Built customizable YouTube Player components with custom
          controls, keyboard shortcuts, fullscreen support, server-side
          rendering compatibility, and branding-free playback.
        </p>

        <p>
          Built Ethnic Elegance, a modern women's ethnic wear e-commerce
          platform featuring secure authentication, Razorpay payment gateway,
          role-based admin dashboard, product management, order management,
          email notifications, Redis caching, PostgreSQL database, and
          Cloudinary media storage.
        </p>

        <p>
          Developed Mahi Events, a business portfolio platform with an admin
          dashboard for event management, employee management, and job posting
          functionality using Next.js, PostgreSQL, and modern UI components.
        </p>

        <p>
          Created The DevTinder platform inspired by Tinder to help developers
          connect professionally through authentication, developer profiles,
          real-time connection requests, and payment integration.
        </p>

        <p>
          Built a YouTube Clone implementing YouTube Data API integration,
          search functionality, comments, caching, Redux Toolkit state
          management, and responsive React interfaces.
        </p>

        <p>
          Developed portfolio websites and modern business landing pages using
          Next.js, ShadCN UI, Clerk Authentication, Framer Motion, and modern
          frontend development practices.
        </p>

        <h2>Technical Skills</h2>

        <p>Programming Languages: JavaScript, TypeScript.</p>

        <p>
          Frontend Technologies: React, Next.js, Tailwind CSS, SCSS, ShadCN UI,
          Redux Toolkit, HTML5, CSS3, Responsive Design, Server Components,
          Client Components.
        </p>

        <p>
          Backend Technologies: Node.js, Express.js, REST APIs, Authentication,
          JWT, API Development, Backend Architecture.
        </p>

        <p>Databases: PostgreSQL, MongoDB, Redis, Neon Database.</p>

        <p>
          Cloud and DevOps: AWS EC2, Docker, CI/CD, Cloudinary, Deployment,
          Vercel.
        </p>

        <p>
          Development Tools: Git, GitHub, Cursor, Visual Studio Code, Postman,
          Figma.
        </p>

        <p>
          Additional Skills: Component Libraries, API Integration, Performance
          Optimization, Authentication Systems, Admin Dashboards, Payment
          Gateway Integration, Email Integration, Responsive Web Design,
          Database Design, Software Architecture.
        </p>

        <h2>Areas of Expertise</h2>

        <p>
          Full Stack Development, Frontend Development, Backend Development,
          SaaS Development, E-commerce Platforms, Developer Tools, Component
          Libraries, AI Applications, Video Streaming Platforms, Authentication
          Systems, Learning Management Systems, Portfolio Websites, Business
          Websites, RESTful APIs, Cloud Infrastructure, Database Management,
          Modern JavaScript Development.
        </p>
      </div>
      <ResumePage />
      <Footer />
    </>
  );
}
