import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { withPrefix } from "gatsby";

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
          socials {
            image {
              publicURL
            }
            title
            link
          }
        }
      }
    }
  `);

  const name = data?.markdownRemark?.frontmatter?.about?.name;
  const title = data?.markdownRemark?.frontmatter?.about?.title;
  const body = data?.markdownRemark?.frontmatter?.about?.body;
  const socials = data?.markdownRemark?.frontmatter?.socials;

  const navigationArray = [
    { label: "ABOUT", value: "#about" },
    { label: "SKILLS", value: "#skills" },
    { label: "GITHUB", value: "#github" },
    { label: "EXPERIENCES", value: "#experiences" },
    { label: "PROJECTS", value: "#projects" },
    { label: "TESTIMONIALS", value: "#testimonials" },
  ];

  return (
    <header className="w-full flex flex-col gap-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-muted-foreground text-sm">
            <span className="text-primary">$</span> whoami
          </p>
          <div className="flex items-center gap-2">
            {socials?.map((item: any, index: number) => {
              const logo = item?.image?.publicURL;
              return (
                <Tooltip key={item?.title + index}>
                  <TooltipTrigger asChild>
                    <a href={item?.link} target="_blank">
                      <img
                        className="w-5 h-5 invert brightness-200"
                        src={logo}
                        alt={item?.title}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item?.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
        <h1 className="font-bold text-4xl md:text-5xl m-0 p-0 text-primary">{name}</h1>
        <p className="m-0 mt-1 text-lg text-secondary">{title}</p>
        {body && (
          <div className="mt-4 text-foreground">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        )}

        <a
          href={withPrefix("/Aaron_Jay_Resume.pdf")}
          download="Aaron_Jay_Resume.pdf"
          className="text-primary hover:underline mt-4 inline-block"
          aria-label="Download my resume (PDF)"
        >
          Download résumé
        </a>
      </div>

      <nav className="flex flex-wrap border-b border-border">
        {navigationArray.map((item) => (
          <a
            key={item.value}
            href={item.value}
            className="px-3 py-1.5 text-xs font-mono no-underline uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-200 border border-b-0 border-border bg-muted/40"
          >
            {item.label}
          </a>
        ))}
      </nav>

    </header>
  );
}

export default SideContent;
