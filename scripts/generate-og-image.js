const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "../static/og-image.svg");
const pngPath = path.join(__dirname, "../static/og-image.png");

const svgBuffer = fs.readFileSync(svgPath);

sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log("OG image generated successfully at static/og-image.png");
  })
  .catch((err) => {
    console.error("Error generating OG image:", err);
  });
