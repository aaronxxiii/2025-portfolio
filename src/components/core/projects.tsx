import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ExternalLinkIcon } from "lucide-react";
import { openInNewTab } from "@/lib/utils";

function projects() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          projects {
            image {
                publicURL
                childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: WEBP)
                }
            }
            title
            link
            body
            stacks {
              stack_name
            }
          }
        }
      }
    }
  `);

  const projects = data?.markdownRemark?.frontmatter?.projects

  return (
    <div className="flex flex-col gap-y-12">
      {projects?.map((item: any, index: number) => {
        const image = getImage(item?.image)
        return (<div className="grid grid-cols-8 gap-y-4 justify-start rounded-sm group relative transition-all duration-300 hover:cursor-pointer" key={item?.title + index} onClick={() => item?.link ? openInNewTab(item?.link) : void (0)}>
          <div className="col-span-8 md:col-span-2 row-start-2 md:row-start-1">
            <GatsbyImage
              className="mt-1"
              image={image}
              alt="Logo"
              placeholder="none"
            />
          </div>
          <div className="col-span-8 md:col-span-6 ml-0 md:ml-6">
            <span className="font-semibold text-lg flex items-start justify-between">{item?.title} {item?.link && <ExternalLinkIcon className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />} </span>
            <div className="mt-4 text-sm text-justify">
              <ReactMarkdown>
                {item?.body}
              </ReactMarkdown>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {item?.stacks?.map((stack: any, index: number) => (<Badge key={stack?.stack_name + index}>{stack?.stack_name}</Badge>))}
            </div>
          </div>
          <span className="absolute -inset-6 p-6 group-hover:bg-slate-400/10 transition-all duration-300 -z-1 rounded-sm">
          </span>
        </div>)
      }
      )}
    </div>
  );
}

export default projects;
