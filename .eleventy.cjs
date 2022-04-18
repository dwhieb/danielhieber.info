const { extname } = require(`path`)
const less        = require(`less`)
const minifier    = require(`html-minifier`)

const lessOptions = {
  paths: [
    `src`,
    `src/layouts/main`,
  ],
}

const minifyOptions = {
  ignoreCustomFragments: [
    // These rules are necessary because html-minifier removes this whitespace otherwise,
    // creating invalid CSS. See https://github.com/kangax/html-minifier/issues/1127.
    /svg \*/u,
    /symbol \*/u,
  ],
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
  config.addPassthroughCopy(`src/fonts/**/*.woff2`)
  config.addPassthroughCopy(`src/images/*.jpg`)
  config.addTransform(`min-html`, minifyHTML)

  return {
    dir: {
      data    : `data`,
      includes: `components`,
      input   : `src`,
      layouts : `layouts`,
      output  : `site`,
    },
    templateFormats: [`ico`, `md`, `njk`],
  }

}