// This is the simple, correct Eleventy config.
// Its only job is to build HTML and copy the Webpack-built assets.

module.exports = function(eleventyConfig) {
  
  // 1. Copy the ENTIRE 'src/assets' folder (which Webpack built)
  eleventyConfig.addPassthroughCopy("./src/assets/");
  
  // 2. Copy your lottie files
  eleventyConfig.addPassthroughCopy("src/lottie");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};