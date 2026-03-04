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
          <div className="col-span-8">
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
            <details className="mt-4 group">
              <summary className="text-muted-foreground text-sm cursor-pointer list-none flex items-center gap-1 hover:text-foreground transition-colors">
                <span className="text-primary">$</span> cat testimonial.txt
                <span className="text-muted-foreground text-xs ml-1 group-open:rotate-90 transition-transform">&#9654;</span>
              </summary>
              <p className="mt-2 text-sm text-justify text-foreground">
                {item?.body}
              </p>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;
