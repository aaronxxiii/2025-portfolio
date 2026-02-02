import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Aaron Jay Malabanan | Front End Engineer`,
    siteUrl: `https://aarondotdev.com`,
    description: `Front End Engineer specializing in building fast, accessible, and pixel-perfect user interfaces. Currently at Betrnk, crafting performant web experiences with React, Next.js, and TypeScript.`,
    author: `Aaron Jay Malabanan`,
    image: `/og-image.png`,
    twitterUsername: `@aarondotdev`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-decap-cms",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Aaron Jay Malabanan | Front End Engineer",
        short_name: "Aaron Jay",
        start_url: "/",
        background_color: "#1a2a33",
        theme_color: "#5bc0be",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdowns`,
        path: `${__dirname}/src/markdowns`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `multimedia`,
    //     path: `${__dirname}/src/multimedia`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `JFE Engineering Indonesia`,
    //     short_name: `JFEEI`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#149be1`,
    //     display: `standalone`,
    //     icon: `src/multimedia/jfeei-favicon.png`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#0073AF`,
        showSpinner: false,
      },
    },
  ],
};

export default config;
