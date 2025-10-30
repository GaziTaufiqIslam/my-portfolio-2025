module.exports = function(eleventyConfig) {
  // Tell 11ty to watch our bundled assets for changes
  eleventyConfig.addWatchTarget("./src/assets/");

  // Copy our assets folder to the final build
  eleventyConfig.addPassthroughCopy("./src/assets/");

  return {
    dir: {
      input: "src",      // Source folder
      output: "_site"    // Build folder
    }
  };
};