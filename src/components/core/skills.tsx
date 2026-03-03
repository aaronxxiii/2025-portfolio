import { graphql, useStaticQuery } from "gatsby";
import React from "react";

function Skills() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          skills {
            category
            items {
              skill_name
            }
          }
        }
      }
    }
  `);

  const skills = data?.markdownRemark?.frontmatter?.skills ?? [];

  return (
    <div className="text-sm font-mono overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-secondary py-2 pr-4 whitespace-nowrap">
              Category
            </th>
            <th className="text-left text-secondary py-2">Skills</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((group: any, gi: number) => (
            <tr
              key={group?.category + gi}
              className="border-b border-border last:border-b-0"
            >
              <td className="py-2 pr-4 align-top whitespace-nowrap text-primary">
                {group?.category}
              </td>
              <td className="py-2 text-foreground">
                {group?.items
                  ?.map((item: any) => item?.skill_name)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Skills;
