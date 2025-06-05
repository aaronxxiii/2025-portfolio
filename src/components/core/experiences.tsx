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
            company {
              name
            }
          }
        }
      }
    }
  `);

  const experiences = data?.markdownRemark?.frontmatter?.experiences

  return (
    <div className="flex flex-col gap-10">
      {experiences?.map((item: any, index: number) =>
        <div className="grid grid-cols-8 justify-start relative" key={item?.title + index}>
          <p className="text-sm whitespace-nowrap mt-1 col-span-8 md:col-span-2">{item?.date}</p>
          <div className="col-span-6 ml-0 md:ml-10">
            <span className="font-semibold text-lg">{item?.title} - {item?.company?.name}</span>
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
      )}
    </div>
  );
}

export default experiences;
