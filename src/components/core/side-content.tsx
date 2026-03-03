import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";
import { buttonVariants } from "@/components/ui/button";
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
    {
      label: "ABOUT",
      value: "#about",
    },
    {
      label: "SKILLS",
      value: "#skills",
    },
    {
      label: "EXPERIENCES",
      value: "#experiences",
    },
    {
      label: "PROJECTS",
      value: "#projects",
    },
    {
      label: "GITHUB",
      value: "#github",
    },
  ];

  return (
    <header className="w-full flex flex-col gap-y-4">
      <div>
        <p className="text-muted-foreground text-sm mb-1">
          <span className="text-primary">$</span> whoami
        </p>
        <h1 className="font-bold text-4xl md:text-5xl m-0 p-0 text-primary">{name}</h1>
        <p className="m-0 text-lg text-secondary">{title}</p>
        <div className="mt-4 text-foreground">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        <a
          href={withPrefix("/Aaron_Jay_Resume.pdf")}
          download="Aaron_Jay_Resume.pdf"
          className="text-primary hover:underline mt-2 inline-block"
          aria-label="Download my resume (PDF)"
        >
          Download résumé
        </a>
      </div>

      <nav className="flex flex-wrap gap-x-4 gap-y-1">
        {navigationArray.map((item: any) => (
          <a
            className={cn(
              buttonVariants({ variant: "link" }),
              "!text-xs p-0 no-underline uppercase tracking-wider text-muted-foreground hover:text-primary"
            )}
            key={item?.value}
            href={item?.value}
          >
            {item?.label}
          </a>
        ))}
      </nav>

      <div className="socials flex items-center gap-2">
        {socials?.map((item: any, index: number) => {
          const logo = item?.image?.publicURL;
          return (
            <Tooltip key={item?.title + index}>
              <TooltipTrigger asChild>
                <a href={item?.link} target="_blank">
                  <img
                    className="w-6 h-6 invert brightness-200"
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
    </header>
  );
}

export default SideContent;
