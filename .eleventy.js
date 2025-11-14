const Image = require("@11ty/eleventy-img");
const glob = require("glob");
const path = require("path");

module.exports = function(eleventyConfig) {
  
  // We need to copy BOTH the assets folder (for CSS) 
  // AND the new fonts folder.
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("fonts");
  
  eleventyConfig.addPassthroughCopy("src/lottie");

  const isServe = process.env.ELEVENTY_RUN_MODE === 'serve';

  if (isServe) {
    // In dev mode ("npm start"), just copy the images.
    console.log("Dev mode: Copying images directly.");
    eleventyConfig.addPassthroughCopy("src/images");
  
  } else {
    // In production mode ("npm run build"), run full compression.
    eleventyConfig.on('beforeBuild', async () => {
      console.log("Build mode: Starting image compression...");

      // 1. Find files in separate groups
      const jpegFiles = glob.sync("src/images/**/*.{jpg,jpeg}");
      const pngFiles = glob.sync("src/images/**/*.png");
      const svgFiles = glob.sync("src/images/**/*.svg");

      // 2. Loop and process JPEGs
      if (jpegFiles.length > 0) {
        console.log(`Found ${jpegFiles.length} JPEGs to compress...`);
        await Promise.all(
          jpegFiles.map(async (file) => {
            return Image(file, {
              outputDir: "./_site/images/",
              formats: ["jpeg"], // Only output JPEGs
              jpegOptions: {
                quality: 65,
                progressive: true,
              },
              filenameFormat: (id, src, width, format, options) => {
                return path.basename(src); // Keep original name
              }
            });
          })
        );
      } else {
        console.warn("No JPEGs found in src/images/");
      }
      
      // 3. Loop and process PNGs
      if (pngFiles.length > 0) {
        console.log(`Found ${pngFiles.length} PNGs to compress...`);
        await Promise.all(
          pngFiles.map(async (file) => {
            return Image(file, {
              outputDir: "./_site/images/",
              formats: ["png"], // Only output PNGs
              pngOptions: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              filenameFormat: (id, src, width, format, options) => {
                return path.basename(src); // Keep original name
              }
            });
          })
        );
      } else {
        console.warn("No PNGs found in src/images/");
      }
      
      // 4. Loop and process SVGs
      if (svgFiles.length > 0) {
        console.log(`Found ${svgFiles.length} SVGs to copy...`);
        await Promise.all(
          svgFiles.map(async (file) => {
            return Image(file, {
              outputDir: "./_site/images/",
              formats: ["svg"],
              svgShortCircuit: true,
              filenameFormat: (id, src, width, format, options) => {
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

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};