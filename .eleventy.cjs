module.exports = function eleventy(config) {
  return {
    dir: {
      data    : `data`,
      includes: `partials`,
      layouts : `layouts`,
      output  : `site`,
    },
    templateFormats: [`hbs`, `md`],
  }
}