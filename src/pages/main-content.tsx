import Experiences from "@/components/core/experiences";
import Projects from "@/components/core/projects";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
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
    <div className="w-full">
      {/* <ScrollBar /> */}
      <section id="about" className="mx-auto max-w-3xl md:pt-24 pt-6">
        <div className="flex flex-col gap-4 text-justify">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </section>
      <section id="experiences" className="pt-24 max-w-3xl mx-auto">
        <Experiences />
      </section>
      <section id="projects" className="h-[100vh] pt-24 max-w-3xl mx-auto">
        <Projects />
      </section>
    </div>
  );
}

export default MainContent;
