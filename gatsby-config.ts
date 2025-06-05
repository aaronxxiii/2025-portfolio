import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-ts-netlify`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
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
