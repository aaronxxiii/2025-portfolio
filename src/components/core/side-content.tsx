import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { graphql, Link, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";
import { useVisibleSection } from "@/lib/use-visible-section";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";



function SideContent() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          about {
            name
            title
            body
            }
            }
            }
            }
            `);

  const name = data?.markdownRemark?.frontmatter?.about?.name;
  const title = data?.markdownRemark?.frontmatter?.about?.title;
  const body = data?.markdownRemark?.frontmatter?.about?.body;

  const SECTION_IDS = ['about', 'experiences', 'projects'];
  // const activeId = useVisibleSection(SECTION_IDS);

  const navigationArray = [
    {
      label: "ABOUT",
      value: "#about"
    },
    {
      label: "EXPERIENCES",
      value: "#experiences"
    },
    {
      label: "PROJECTS",
      value: "#projects"
    },
  ]


  return (
    <header className="relative md:sticky top-0 max-w-[400px] max-h-screen md:min-h-screen w-full h-full flex flex-col gap-y-4 justify-start md:justify-between box-border py-24">
      <div className="px-6 flex flex-col">
        <h1 className="font-bold text-5xl m-0 p-0">{name}</h1>
        <p className="m-0 text-lg">{title}</p>
        <div className="mt-4">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </div>

      <nav className="hidden flex-col justify-start px-6 md:flex">
        {navigationArray.map((item: any, index: number) => (
          <a
            className={cn(buttonVariants({ variant: "link" }), "w-max !text-xs p-0")}
            key={item?.value}
            href={item?.value}
          >
            {item?.label}
          </a>
        ))}
      </nav>

      <div className="px-6">
        <div className="socials flex items-center gap-2">
          <BsGithub className="w-5 h-5" />
          <BsLinkedin className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}

export default SideContent;
