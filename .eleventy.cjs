const { extname } = require(`path`)
const less        = require(`less`)
const minifier    = require(`html-minifier`)

const lessOptions = {
  paths: [],
}

const minifyOptions = {
  collapseWhitespace   : true,
  quoteCharacter       : `'`,
  minifyCSS            : true,
  minifyJS             : true,
  removeAttributeQuotes: true,
  removeComments       : true,
}

async function convertLESS(input) {
  const { css } = await less.render(input, lessOptions)
  return css;
}

function minifyHTML(content) {

  const ext = extname(this.outputPath)

  if (ext === `.html`) {
    return minifier.minify(content, minifyOptions)
  }

  return content;

}

module.exports = function eleventy(config) {

  config.addFilter(`less`, convertLESS)
  config.addPassthroughCopy(`src/favicon.svg`)
  config.addPassthroughCopy(`src/images/*.jpg`)
  config.addTransform(`min-html`, minifyHTML)

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