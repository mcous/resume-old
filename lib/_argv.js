'use strict'

const assert = require('assert')
const path = require('path')
const pkg = require('../package.json')

const argv = process.argv.slice(2)
const valid = argv.length >= 2 && argv.length <= 4
const CWD = process.cwd()
const COMMAND = path.relative(CWD, process.argv[1])

assert(valid, `Usage: node ${COMMAND} <markdown> <css> [pdf_name] [out_dir]`)

const mdSource = path.resolve(CWD, argv[0])
const cssSource = path.resolve(CWD, argv[1])
const pdfName = argv[2] || replaceExtension(mdSource, 'pdf')
const outDir = path.resolve(CWD, argv[3] || '')
const basePath = `/${pkg.name}`

module.exports = {
  mdSource: mdSource,
  cssSource: cssSource,
  pdfName: pdfName,
  outDir: outDir,
  basePath: basePath
}

function replaceExtension (file, ext) {
  const extname = path.extname(file)
  const basename = path.basename(file, extname)

  return `${basename}.${ext}`
}
