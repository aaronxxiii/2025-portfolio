import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

function experiences() {
    const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
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

    const experiences = data?.markdownRemark?.frontmatter?.experiences

    return (
        <div className="p-10 space-y-4">
            {experiences?.map((item: any, index: number) =>
                <div className="" key={item?.title + index}>
                    <p>{item?.date}</p><span>{item?.title}</span>
                    <ReactMarkdown>
                        {item?.body}
                    </ReactMarkdown>
                    <div className="flex gap-2 mt-4">
                        {item?.stacks?.map((stack: any) => (<Badge>{stack?.stack_name}</Badge>))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default experiences;
