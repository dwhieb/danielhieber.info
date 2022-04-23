const createSpriteCollection = require(`svgstore`)
const { extname }            = require(`path`)
const less                   = require(`less`)
const minifier               = require(`html-minifier`)
const path                   = require(`path`)
const { readFile }           = require(`fs/promises`)
const recurse                = require(`readdirp`)

const lessOptions = {
  globalVars: {
    // These values need to be wrapped in quotes in order for the LESS files to compile.
    // This is because LESS outputs the bare text of the variable, which would result
    // in an unquote path/url, which is invalid CSS.
    pathPrefix: process.env.GITHUB_ACTIONS ? `'/danielhieber.info'` : `''`,
  },
  paths: [
    `src`,
    `src/layouts/main`,
  ],
}

const minifyOptions = {
  collapseWhitespace   : true,
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

const recurseOptions = {
  fileFilter: [`*.svg`, `!favicon.svg`],
}

const spriteOptions = {
  copyAttrs: [
    `fill`,
    `stroke`,
    `stroke-width`,
    `stroke-linecap`,
    `stroke-linejoin`,
  ],
  svgAttrs: {
    'aria-hidden': true,
    style        : `display: none;`,
  },
}

async function compileSprites() {

  const imagesPath     = path.join(__dirname, `./src/images`)
  const sprites        = createSpriteCollection(spriteOptions)
  const svgFilesStream = await recurse(imagesPath, recurseOptions)

  for await (const entry of svgFilesStream) {

    const ext      = path.extname(entry.basename)
    const filename = path.basename(entry.basename, ext)
    const svg      = await readFile(entry.fullPath, `utf8`)

    sprites.add(filename, svg)

  }

  return sprites.toString({ inline: true })

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
  config.addNunjucksAsyncShortcode(`sprites`, compileSprites)
  config.addPassthroughCopy(`src/favicon.svg`)
  config.addPassthroughCopy(`src/fonts/**/*.woff2`)
  config.addPassthroughCopy(`src/images`)
  config.addTransform(`min-html`, minifyHTML)

  return {
    dir: {
      data    : `data`,
      includes: `components`,
      input   : `src`,
      layouts : `layouts`,
      output  : `site`,
    },
    pathPrefix     : process.env.GITHUB_ACTIONS ? `danielhieber.info`: ``,
    templateFormats: [`ico`, `md`, `njk`],
  }

}