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
            hideStacks
            date
            body
            title
            stacks {
              stack_name
            }
            contributions {
              contribution
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
    <div className="flex flex-col gap-y-12">
      {experiences?.map((item: any, index: number) =>
        <div className="grid grid-cols-8 justify-start relative" key={item?.title + index}>
          <p className="text-sm whitespace-nowrap mt-1 col-span-8 md:col-span-2 font-semibold text-muted-foreground">{item?.date}</p>
          <div className="col-span-8 md:col-span-6 ml-0 md:ml-10">
            <span className="font-semibold text-lg text-primary">{item?.title} - {item?.company?.name}</span>
            <div className="mt-4 text-sm text-justify">
              <ReactMarkdown>
                {item?.body}
              </ReactMarkdown>
            </div>
            {item?.contributions?.length > 0 && (
              <details className="mt-4 group">
                <summary className="text-muted-foreground text-sm cursor-pointer list-none flex items-center gap-1 hover:text-foreground transition-colors">
                  <span className="text-primary">$</span> ls ./contributions/
                  <span className="text-muted-foreground text-xs ml-1 group-open:rotate-90 transition-transform">&#9654;</span>
                </summary>
                <ul className="list-disc list-inside text-sm flex flex-col gap-1.5 text-muted-foreground mt-2">
                  {item.contributions.map((c: any, i: number) => (
                    <li key={i}>{c?.contribution}</li>
                  ))}
                </ul>
              </details>
            )}
            {!item?.hideStacks && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {item?.stacks?.map((stack: any, index: number) => (<Badge key={stack?.stack_name + index}>{stack?.stack_name}</Badge>))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default experiences;
