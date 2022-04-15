const CleanCSS    = require(`clean-css`)
const { extname } = require(`path`)
const less        = require(`less`)

const cleanCSS = new CleanCSS

const lessOptions = {
  paths: [],
}

async function convertLESS(input) {
  const { css } = await less.render(input, lessOptions)
  return css;
}

function minifyCSS(css) {
  return cleanCSS.minify(css).styles;
}

module.exports = function eleventy(config) {

  config.addFilter(`min-css`, minifyCSS)
  config.addFilter(`less`, convertLESS)
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