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

function convertLESS(input, cb) {
  less.render(input, lessOptions)
  .then(({ css }) => cb(null, css))
}

function minifyHTML(content) {

  const ext = extname(this.outputPath)

  if (ext === `.html`) {
    return minifier.minify(content, minifyOptions)
  }

  return content;

}

module.exports = function eleventy(config) {

  config.addNunjucksAsyncFilter(`css`, convertLESS)
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