"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import experienceData from "@/data/experience.json";

export function Experience() {
  return (
    <section className="pt-20 space-y-6" id="experience">
      <h1 className="text-xl font-semibold">Experience</h1>
      <div className="space-y-3 w-full mt-3">
        {experienceData.experience.map((experience) => (
          <Accordion type="single" collapsible key={experience.company}>
            <AccordionItem value={experience.company}>
              <AccordionTrigger className="flex w-full items-center">
                <div className="flex w-full flex-row items-center justify-between gap-y-1 gap-x-3">
                  <div className="flex items-center gap-x-3 min-w-0">
                    <Avatar className="size-9 sm:size-10 shrink-0 rounded-md border-2">
                      <AvatarImage src={experience.image} />
                      <AvatarFallback className="text-xs rounded-md">
                        {experience.company[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-left">
                      <p className="font-semibold text-sm sm:text-base truncate">
                        {experience.company}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {experience.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 text-right">
                    <p className="text-xs sm:text-sm whitespace-nowrap">
                      {experience.startDate} – {experience.endDate}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {experience.duration}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pb-2">
                  <h2 className="text-sm font-semibold">Tech Stack</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {experience.tech_stack.map((tech) => (
                      <Button
                        key={tech}
                        variant="outline"
                        size="xs"
                        className="inline-flex items-center text-xs text-muted-foreground"
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                  <ul className="space-y-1.5 mt-2">
                    {experience.description.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-muted-foreground flex gap-x-2"
                      >
                        <span className="text-muted-foreground/50 select-none">
                          •
                        </span>
                        <span>{item.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
