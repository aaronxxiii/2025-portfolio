import React from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
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
    <header className="sticky top-0 max-w-[400px] max-h-screen min-h-screen w-full h-full flex flex-col justify-between box-border py-24">
      <div className="px-4 flex flex-col">
        <h1 className="font-bold text-2xl m-0 p-0">{name}</h1>
        <p className="m-0">{title}</p>
        <div className="mt-4">
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </div>
      </div>

      <div className="px-4">
        <div className="socials flex items-center gap-2">
          <BsFacebook className="w-5 h-5" />
          <BsLinkedin className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}

export default SideContent;
