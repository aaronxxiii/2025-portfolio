import { graphql, useStaticQuery } from "gatsby";
import React from "react";

function Testimonials() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          testimonials {
            featured
            name
            role
            company
            date
            photo
            approved
            body
          }
        }
      }
    }
  `);

  const testimonials = data?.markdownRemark?.frontmatter?.testimonials?.filter(
    (t: any) => t?.approved && t?.featured
  );

  if (!testimonials?.length) return null;

  return (
    <div className="flex flex-col gap-y-8">
      {testimonials.map((item: any, index: number) => (
        <div
          className="grid grid-cols-8 justify-start relative"
          key={item?.name + index}
        >
          <p className="text-sm whitespace-nowrap mt-1 col-span-8 md:col-span-2 font-semibold text-muted-foreground">
            {item?.date}
          </p>
          <div className="col-span-8 md:col-span-6 ml-0 md:ml-10">
            <div className="flex items-center gap-3">
              {item?.photo && (
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <span className="font-semibold text-lg text-primary">
                  {item?.name}
                </span>
                <p className="text-sm text-muted-foreground">
                  {item?.role}{item?.company ? ` — ${item.company}` : ""}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-justify text-foreground">
              {item?.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;
