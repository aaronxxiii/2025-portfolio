import React from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { graphql, Link, useStaticQuery } from "gatsby";

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

  console.log(data);

  return (
    <div className="bg-zinc-300/50 max-w-[500px] w-full h-auto flex items-center">
      <div className="flex flex-col justify-between h-[calc(100vh-50px)] w-full ">
        <div className="p-4 flex flex-col">
          <h1 className="font-bold text-2xl m-0 p-0">{name}</h1>
          <p className="m-0">{title}</p>
          <div
            className="mt-4 max-w-xs"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>

        <footer className="p-4">
          <div className="socials flex items-center gap-2">
            <BsFacebook className="w-5 h-5" />
            <BsLinkedin className="w-5 h-5" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SideContent;
