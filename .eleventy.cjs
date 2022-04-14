module.exports = function eleventy(config) {

  config.addPassthroughCopy(`src/images/*.jpg`)

  return {
    dir: {
      data    : `data`,
      includes: `partials`,
      input   : `src`,
      layouts : `layouts`,
      output  : `site`,
    },
    templateFormats: [`hbs`, `ico`, `md`],
  }

}