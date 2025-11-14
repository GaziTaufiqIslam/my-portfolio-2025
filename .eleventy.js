const Image = require("@11ty/eleventy-img");
const glob = require("glob"); // We need this to find the files
const path = require("path"); // We need this for the fix

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("src/lottie");

  // --- THIS IS THE FIX ---
  // Check if we are in "serve" mode (npm start) or "build" mode (npm run build)
  const isServe = process.env.ELEVENTY_RUN_MODE === 'serve';

  if (isServe) {
    // In dev mode ("npm start"), just copy the images. It's fast and works.
    console.log("Dev mode: Copying images directly.");
    eleventyConfig.addPassthroughCopy("src/images");
  
  } else {
    // In production mode ("npm run build"), run full compression.
    eleventyConfig.on('beforeBuild', async () => {
      console.log("Build mode: Starting image compression...");

      // 1. Find all our image files
      const jpegFiles = glob.sync("src/images/**/*.{jpg,jpeg,png}");
      const svgFiles = glob.sync("src/images/**/*.svg");

      // 2. Loop and process JPEGs/PNGs
      if (jpegFiles.length > 0) {
        console.log(`Found ${jpegFiles.length} JPEGs/PNGs to compress...`);
        await Promise.all(
          jpegFiles.map(async (file) => {
            return Image(file, {
              outputDir: "./_site/images/",
              jpegOptions: {
                quality: 65,
                progressive: true,
              },
              pngOptions: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              // --- FIX for HASHED NAMES ---
              filenameFormat: (id, src, width, format, options) => {
                // Use the original filename
                return path.basename(src);
              }
            });
          })
        );
      } else {
        console.warn("No JPEGs or PNGs found in src/images/");
      }
      
      // 3. Loop and process SVGs
      if (svgFiles.length > 0) {
        console.log(`Found ${svgFiles.length} SVGs to copy...`);
        await Promise.all(
          svgFiles.map(async (file) => {
            return Image(file, {
              outputDir: "./_site/images/",
              formats: ["svg"],
              svgShortCircuit: true,
              // --- FIX for HASHED NAMES ---
              filenameFormat: (id, src, width, format, options) => {
                // Use the original filename
                return path.basename(src);
              }
            });
          })
        );
      } else {
        console.warn("No SVGs found in src/images/");
      }
      
      console.log("Finished image processing.");
    });
  }
  // --- END FIX ---

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};