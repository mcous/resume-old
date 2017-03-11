'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const hummus = require('hummus')

const pkg = require('../package.json')
const argv = process.argv.slice(2)
const CWD = process.cwd()
const COMMAND = path.relative(CWD, process.argv[1])

assert(argv.length === 1, `Usage: node ${COMMAND} <pdf>`)

const pdf = path.resolve(CWD, argv[0])

fs.stat(pdf, (error) => {
  assert.ifError(error)

  const writer = hummus.createWriterToModify(pdf)
  const info = writer.getDocumentContext().getInfoDictionary()

  info.author = pkg.author.name
  info.title = pkg.title
  info.subject = pkg.description

  writer.end()
})
