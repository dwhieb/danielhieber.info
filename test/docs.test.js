import { expect }        from 'chai'
import { fileURLToPath } from 'url'
import { readFile }      from 'fs/promises'

import {
  dirname as getDirname,
  join as joinPath,
} from 'path'

describe(`license`, function() {

  it(`has the correct year`, async function() {

    const __filename  = fileURLToPath(import.meta.url)
    const __dirname   = getDirname(__filename)
    const licensePath = joinPath(__dirname, `./LICENSE`)
    const text        = await readFile(licensePath, `utf8`)
    const yearRegExp  = /2020\u2013(?<year>\d{4})/u // en-dash
    const { year }    = yearRegExp.exec(text).groups

    const currentYear = new Date()
    .getFullYear()
    .toString()

    expect(year).to.equal(currentYear)

  })

})
