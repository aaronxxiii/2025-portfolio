import Experiences from "@/components/core/experiences";
import Footer from "@/components/core/footer";
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
      <section id="about" className="pt-6">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> cat about.md
        </p>
        <div className="flex flex-col gap-4 text-justify">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </section>

      <section id="experiences" className="pt-16 border-t border-border mt-16">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> ls ./experiences/
        </p>
        <Experiences />
      </section>

      <section id="projects" className="pt-16 border-t border-border mt-16">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> ls ./projects/
        </p>
        <Projects />
      </section>

      <section className="pt-16 border-t border-border mt-16">
        <footer className="pb-16 text-center flex justify-center">
          <Footer />
        </footer>
      </section>
    </div>
  );
}

export default MainContent;
