import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ExternalLinkIcon } from "lucide-react";
import { openInNewTab } from "@/lib/utils";

function footer() {
    const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          footer {
            body
          }
        }
      }
    }
  `);

    const footer = data?.markdownRemark?.frontmatter?.footer

    return (
        <div className="mt-4 text-sm text-justify">
            <ReactMarkdown>
                {footer?.body}
            </ReactMarkdown>
        </div>
    );
}

export default footer;
