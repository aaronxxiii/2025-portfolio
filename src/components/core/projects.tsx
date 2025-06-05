import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
        <div className="flex flex-col gap-10">
            {projects?.map((item: any, index: number) => {
                const image = getImage(item?.image)
                return <div className="grid grid-cols-8 justify-start relative" key={item?.title + index}>
                    <div className="col-span-3">
                        <GatsbyImage
                            className="logo"
                            image={image}
                            alt="Logo"
                            placeholder="none"
                        />
                    </div>
                    <div className="col-span-5 ml-0 md:ml-10">
                        <span className="font-semibold text-lg">{item?.title}</span>
                        <div className="mt-4 text-sm">
                            <ReactMarkdown>
                                {item?.body}
                            </ReactMarkdown>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {item?.stacks?.map((stack: any, index: number) => (<Badge key={stack?.stack_name + index}>{stack?.stack_name}</Badge>))}
                        </div>
                    </div>
                </div>
            }
            )}
        </div>
    );
}

export default projects;
