import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { graphql, Link, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";

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
        }
      }
    }
  `);

  const name = data?.markdownRemark?.frontmatter?.about?.name;
  const title = data?.markdownRemark?.frontmatter?.about?.title;
  const body = data?.markdownRemark?.frontmatter?.about?.body;

  return (
    <header className="relative md:sticky top-0 max-w-[400px] max-h-screen md:min-h-screen w-full h-full flex flex-col gap-y-4 justify-start md:justify-between box-border py-24">
      <div className="px-6 flex flex-col">
        <h1 className="font-bold text-2xl m-0 p-0">{name}</h1>
        <p className="m-0">{title}</p>
        <div className="mt-4">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </div>

      <div className="px-6">
        <div className="socials flex items-center gap-2">
          <BsGithub className="w-5 h-5" />
          <BsLinkedin className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}

export default SideContent;
