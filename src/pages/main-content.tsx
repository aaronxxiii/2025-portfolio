import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

function MainContent() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          overview {
            body
          }
        }
      }
    }
  `);

  const body = data?.markdownRemark?.frontmatter?.overview?.body;

  return (
    <ScrollArea className="h-screen w-full bg-slate-300/20">
      <ScrollBar />
      <section id="about" className="h-[100vh]">
        <div className="p-10">
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </section>
      <section className="h-[100vh]">experience</section>
      <section className="h-[100vh]">projects</section>
    </ScrollArea>
  );
}

export default MainContent;
