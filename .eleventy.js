module.exports = function(eleventyConfig) {
  // Tell 11ty to watch our bundled assets for changes
  eleventyConfig.addWatchTarget("./src/assets/");

  // Copy our assets folder to the final build
  eleventyConfig.addPassthroughCopy("./src/assets/");

  // This rule copies your HTML images directly
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",      // Source folder
      output: "_site"    // Build folder
    }
  };
};