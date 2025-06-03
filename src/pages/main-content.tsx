import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

function MainContent() {
  return (
    <ScrollArea className="h-screen w-full bg-slate-300/20">
      <ScrollBar />
      <section id="about" className="h-[100vh]">
        <div className="p-10">
          <p>
            I’m a developer passionate about crafting accessible, pixel-perfect
            user interfaces that blend thoughtful design with robust
            engineering.
          </p>
          <p>
            My favorite work lives at the intersection of design and
            development—creating experiences that not only look great but are
            meticulously built for performance and usability.
          </p>

          <p>
            Currently, I'm a Front-End Engineer at Betrnk, specializing in
            development. I help design, build, and maintain the UI components
            that power Betrnk's frontend, ensuring our platform meets web
            accessibility standards and best practices to deliver an inclusive
            user experience.
          </p>

          <p>
            In the past, I’ve developed CMS projects for international clients
            and built software across agencies, startups, and businesses in
            industries ranging from digital media to tech.
          </p>
        </div>
      </section>
      <section className="h-[100vh]">experience</section>
      <section className="h-[100vh]">projects</section>
    </ScrollArea>
  );
}

export default MainContent;
