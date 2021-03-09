// copy the CSS source to the output directory
'use strict'

const { read: readFile, write: writeFile } = require('to-vfile')
const rename = require('vfile-rename')

function buildCss(buildParams) {
  const { cssSource, outputDir } = buildParams

  return readFile(cssSource).then((file) =>
    writeFile(rename(file, { dirname: outputDir }))
  )
}

module.exports = { buildCss }
