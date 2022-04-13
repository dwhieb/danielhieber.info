module.exports = function eleventy(config) {
  return {
    dir: {
      data    : `data`,
      includes: `partials`,
      input   : `src`,
      layouts : `layouts`,
      output  : `site`,
    },
    templateFormats: [`hbs`, `md`],
  }
}