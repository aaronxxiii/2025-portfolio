module.exports = {
  plugins: [
    require("@tailwindcss/postcss")({
      config: "./tailwind.config.js", // optional if you're using a custom path
    }),
    require("autoprefixer"),
  ],
};
