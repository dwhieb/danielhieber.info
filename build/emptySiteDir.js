import { emptyDir } from 'fs-extra'
import { fileURLToPath } from 'url'

import {
  dirname as getDirname,
  join as joinPath,
} from 'path'

const __dirname = getDirname(fileURLToPath(import.meta.url))
const sitePath  = joinPath(__dirname, `../site`)

await emptyDir(sitePath)
