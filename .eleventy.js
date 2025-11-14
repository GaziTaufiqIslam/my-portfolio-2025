module.exports = function(eleventyConfig) {
  
  // This is the correct copy command
  eleventyConfig.addPassthroughCopy("./src/assets/");

  // We still copy lottie files
  eleventyConfig.addPassthroughCopy("src/lottie");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};