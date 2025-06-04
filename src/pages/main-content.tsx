import Experiences from "@/components/core/experiences";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";

function MainContent() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          overview {
            body
          }
          experiences {
            date
            body
            title
            stacks {
              stack_name
            }
          }
        }
      }
    }
  `);

  const body = data?.markdownRemark?.frontmatter?.overview?.body;

  return (
    <ScrollArea className="h-screen w-full bg-slate-300/20">
      <ScrollBar />
      <section id="about" className="mt-20">
        <div className="p-10 flex flex-col gap-4">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </section>
      <section className="h-[100vh] mt-20">
        <Experiences />
      </section>
      <section className="h-[100vh]">projects</section>
    </ScrollArea>
  );
}

export default MainContent;
