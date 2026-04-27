import { graphql, useStaticQuery, withPrefix } from "gatsby";
import React from "react";
import { ExternalLinkIcon, AwardIcon } from "lucide-react";
import { openInNewTab } from "@/lib/utils";

function Certificates() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          certificates {
            hidden
            title
            issuer
            date
            link
            body
          }
        }
      }
    }
  `);

  const certificates = data?.markdownRemark?.frontmatter?.certificates?.filter(
    (item: any) => !item?.hidden
  );

  if (!certificates?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
      {certificates.map((item: any, index: number) => {
        const isExternal = item?.link?.startsWith("http");
        const href = item?.link
          ? isExternal
            ? item.link
            : withPrefix(item.link)
          : undefined;

        return (
          <div
            key={item?.title + index}
            className="group relative rounded-sm transition-all duration-300 hover:cursor-pointer"
            onClick={() => href && openInNewTab(href)}
          >
            <div className="flex items-start gap-3">
              <AwardIcon
                className="w-5 h-5 mt-1 text-primary shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-primary leading-snug">
                    {item?.title}
                  </span>
                  {href && (
                    <ExternalLinkIcon
                      className="w-4 h-4 mt-1 shrink-0 text-muted-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {item?.issuer}
                  {item?.date ? ` · ${item.date}` : ""}
                </p>
                {item?.body && (
                  <p className="text-sm text-muted-foreground mt-2 text-justify">
                    {item.body}
                  </p>
                )}
              </div>
            </div>
            <span className="absolute -inset-4 p-4 group-hover:bg-accent transition-all duration-300 -z-1 rounded-sm" />
          </div>
        );
      })}
    </div>
  );
}

export default Certificates;
