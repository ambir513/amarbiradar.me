import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  React,
  Node,
  Next,
  TailwindCSS,
  Express,
  AmazonEC2,
  AmazonS3,
  Figma,
  JavaScript,
  Html,
  Css,
  Java,
  Python,
  Cpp,
  Prisma,
  Drizzle,
  MongoDB,
  PostgreSQL,
  Vercel,
  Docker,
} from "../svg/index";
import LatestBlogs from "../blog/components/latest-blogs";

const techStack = [
  React,
  Node,
  Next,
  TailwindCSS,
  Express,
  AmazonEC2,
  AmazonS3,
  Figma,
  JavaScript,
  Html,
  Css,
  Java,
  Python,
  Cpp,
  Prisma,
  Drizzle,
  MongoDB,
  PostgreSQL,
  Vercel,
  Docker,
];

export function AboutSection() {
  return (
    <section className="w-full overflow-x-hidden px-2.5 mb-8 pt-20" id="about">
      <h2 className="text-xl font-semibold">About</h2>

      <Card className="mt-6 w-full max-w-full md:max-w-2xl overflow-hidden">
        <CardHeader className="flex sm:flex-row flex-col items-start gap-4 p-4 sm:p-6">
          <Avatar className="size-[72px] sm:size-24 shrink-0 rounded-md border-2">
            <AvatarImage src="/brand/logo.png" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>

          <div className="w-full min-w-0 space-y-1.5 sm:mt-6">
            <CardTitle className="text-base sm:text-xl font-semibold leading-tight">
              Amar Vishwanath Biradar
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground leading-relaxed break-words">
              I love building products and solving real-world problems. I&apos;m
              a curious person who enjoys learning new things.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-4 pt-0">
          <div className="flex flex-col gap-y-3">
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((TechIcon, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 p-1 shrink-0"
                >
                  <TechIcon />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-y-2 border-b-2 items-start px-4 sm:px-6 pb-3 pt-0">
          <div className="mt-4 space-y-3 w-full">
            <h1 className="text-mdl font-medium mt-3">Medium Blogs</h1>
            <Button
              variant="secondary"
              className="w-full h-fit items-start px-4 py-3 whitespace-normal"
              nativeButton={false}
              render={
                <Link
                  href="https://medium.com/@ambir513/understanding-rag-how-retrieval-augmented-generation-works-0bd4fbb02f72?utm_source=amarbiradar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-y-1 w-full"
                />
              }
            >
              <span className="flex w-full items-start justify-between gap-2">
                <span className="text-sm font-medium leading-snug text-left break-words min-w-0">
                  Understanding RAG: How Retrieval Augmented Generation Works
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
              {/* Description */}
              <span className="text-xs text-muted-foreground text-left leading-relaxed break-words">
                A step-by-step explanation of how AI retrieves relevant
                knowledge before generating answers
              </span>
            </Button>
          </div>
          <h3 className="text-md mt-3 font-semibold">Latest Blogs</h3>

          <LatestBlogs />
        </CardFooter>
      </Card>
    </section>
  );
}
