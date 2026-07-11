import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import data from "@/data/projects.json";
import { Github } from "../svg";

interface Project {
  name: string;
  slug: string;
  logo: string;
  description: string;
  landing: boolean;
  tech: string[];
  link?: string;
  github?: string;
  video_link?: string;
  type?: string;
  isDisabled: boolean;
}

export function ProjectsSection() {
  const projects: Project[] = data.projects;

  return (
    <section className="space-y-6 pt-20" id="projects">
      <h2 className="text-xl font-semibold">Projects</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {projects.map((pro) => (
          <ProjectCard key={pro.name} data={pro} />
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({ data }: { data: Project }) {
  // Strip protocol cleanly — handles both http:// and https://
  const displayLink = data.link?.replace(/^https?:\/\//, "");

  return (
    <Card className="flex flex-col transition-colors hover:bg-accent/40">
      {/* flex-1 pushes the footer to the bottom regardless of description length */}
      <CardHeader className="flex-1">
        <CardTitle className="text-base font-semibold">{data.name}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center gap-2">
        <Button variant="secondary" size="sm" disabled={data.isDisabled}>
          <Link
            href={`${!data.isDisabled ? data.github : "#"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <Github />
            View on GitHub
          </Link>
        </Button>
        {displayLink && (
          <Button
            variant="link"
            nativeButton={false}
            className="inline-flex items-center gap-0.5 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
            render={
              <Link
                href={data.link!}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            {displayLink.length > 20
              ? displayLink.slice(0, 14) + "..."
              : displayLink}
            <ArrowUpRight className="size-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
