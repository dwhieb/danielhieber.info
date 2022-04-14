module.exports = function eleventy(config) {

  config.addPassthroughCopy(`src/favicon.svg`)
  config.addPassthroughCopy(`src/images/*.jpg`)

  return {
    dir: {
      data    : `data`,
      includes: `partials`,
      input   : `src`,
      layouts : `layouts`,
      output  : `site`,
    },
    templateFormats: [`ico`, `md`, `njk`],
  }

}