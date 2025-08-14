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
      label: "EXPERIENCES",
      value: "#experiences",
    },
    {
      label: "PROJECTS",
      value: "#projects",
    },
  ];

  return (
    <header className="relative md:fixed top-0 max-w-[400px] max-h-screen md:min-h-screen w-full h-full flex flex-col gap-y-4 justify-start md:justify-between box-border py-24">
      <div className="px-6 flex flex-col">
        <h1 className="font-bold text-5xl m-0 p-0">{name}</h1>
        <p className="m-0 text-lg">{title}</p>
        <div className="mt-4">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        <a
          href={withPrefix("/Aaron_Jay_Malabanan_Resume.pdf")}
          download="Aaron_Malabanan_Resume.pdf"
          className="text-black mt-2"
          aria-label="Download my resume (PDF)"
        >
          Download résumé
        </a>
      </div>

      <nav className="hidden flex-col justify-start px-6 md:flex">
        {navigationArray.map((item: any, index: number) => (
          <a
            className={cn(
              buttonVariants({ variant: "link" }),
              "w-max !text-xs p-0 no-underline"
            )}
            key={item?.value}
            href={item?.value}
          >
            {item?.label}
          </a>
        ))}
      </nav>

      <div className="px-6">
        <div className="socials flex items-center gap-2">
          {socials?.map((item: any, index: number) => {
            const logo = item?.image?.publicURL;
            return (
              <Tooltip>
                {" "}
                <TooltipTrigger asChild key={item?.title + index}>
                  <a href={item?.link} target="_blank">
                    <img className="w-6 h-6" src={logo} alt={item?.title} />
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
    </header>
  );
}

export default SideContent;
