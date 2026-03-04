import Experiences from "@/components/core/experiences";
import Footer from "@/components/core/footer";
import GithubCalendar from "@/components/core/github-calendar";
import Projects from "@/components/core/projects";
import Skills from "@/components/core/skills";
import SpotifyNowPlaying from "@/components/core/spotify-now-playing";
import Testimonials from "@/components/core/testimonials";
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

      <SpotifyNowPlaying />

      <section id="skills" className="pt-16 border-t border-border mt-16">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> cat skills.md
        </p>
        <Skills />
      </section>

      <section id="github" className="pt-16 border-t border-border mt-16">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> gh contribution-graph
        </p>
        <GithubCalendar />
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

      <section id="testimonials" className="pt-16 border-t border-border mt-16">
        <p className="text-muted-foreground text-sm mb-4">
          <span className="text-primary">$</span> cat ./testimonials/
        </p>
        <Testimonials />
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
