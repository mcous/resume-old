// test that the PDF output is one page of the correct size
'use strict'

const assert = require('assert')
const PdfParser = require('pdf2json')
const streamEnd = require('end-or-error')

const argv = require('./_argv')
const build = require('./build')

const FAIL_TIMEOUT_MS = 10000

// 1 pdf unit is 16pt, there are 72pts in an inch, letter is 8.5in wide x 11in tall
const WIDTH = 8.5 * 72 / 16
const HEIGHT = 11 * 72 / 16

const buildTimeout = setTimeout(
  () => assert.ifError(new Error('pdf build timed out')),
  FAIL_TIMEOUT_MS)

build.pdf(argv.mdSource, argv.cssSource, (error, pdf) => {
  clearTimeout(buildTimeout)
  assert.ifError(error)

  const numPages = pdf.numberOfPages
  const errorLogs = pdf.logs
    .filter((log) => log.level === 'warn' || log.level === 'error')
    .map((log) => log.message)
    .join('\n')

  assert(errorLogs.length === 0, `expected no error logs but got ${errorLogs}`)
  assert(numPages === 1, `expected 1 pdf page but got ${numPages}`)

  const pdfParser = new PdfParser()
  const parseTimeout = setTimeout(
    () => assert.ifError(new Error('pdf parse timed out')),
    FAIL_TIMEOUT_MS)

  pdfParser.once('pdfParser_dataReady', (pdfData) => {
    clearTimeout(parseTimeout)

    const width = pdfData.formImage.Width
    const pages = pdfData.formImage.Pages

    assert(width === WIDTH, `expected width to be ${WIDTH} but got ${width}`)
    assert(pages.length = 1, `expected 1 parsed page but found ${pages.length}`)

    const height = pages[0].Height

    assert(height === HEIGHT, `expected height to be ${HEIGHT} but got ${height}`)

    console.log('All tests succeeded')
    process.exit()
  })

  streamEnd(pdf.stream.pipe(pdfParser), (error) => assert.ifError(error))
})
