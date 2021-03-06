// test that the PDF output is one page of the correct size
'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const PdfParser = require('pdf2json')
const readableStreamEnd = require('end-or-error')
const runSeries = require('run-series')
const runParallel = require('run-parallel')

const writableStreamFinish = require('./_finish-or-error')
const argv = require('./_argv')
const build = require('./build')
const testResults = require('./test-results')

const RESULTS_DIR = path.dirname(testResults)
const FAIL_TIMEOUT_MS = 30000

// 1 pdf unit is 16pt, there are 72pts in an inch, letter is 8.5in wide x 11in tall
const WIDTH = (8.5 * 72) / 16
const HEIGHT = (11 * 72) / 16

const buildTimeout = setTimeout(
  () => assert.ifError(new Error('pdf build timed out')),
  FAIL_TIMEOUT_MS
)

build.pdf(argv.mdSource, argv.cssSource, (error, pdf) => {
  clearTimeout(buildTimeout)
  assert.ifError(error)

  const nPagesBuilt = pdf.numberOfPages
  const errorLogs = pdf.logs
    .filter((log) => log.level === 'warn' || log.level === 'error')
    .map((log) => log.message)
    .join('\n')

  const pdfStream = pdf.stream
  const pdfParser = new PdfParser()
  const parseTimeout = setTimeout(
    () => assert.ifError(new Error('pdf parse timed out')),
    FAIL_TIMEOUT_MS
  )

  let nPages
  let width
  let height

  runSeries(
    [
      (next) => rimraf(RESULTS_DIR, next),
      (next) => fs.mkdir(RESULTS_DIR, next),
      (next) => {
        const write = pdfStream.pipe(fs.createWriteStream(testResults))
        const parse = pdfStream.pipe(pdfParser).once('data', (pdfData) => {
          clearTimeout(parseTimeout)

          const pages = pdfData.formImage.Pages

          nPages = pages.length
          width = pdfData.formImage.Width
          height = (pages[0] || {}).Height
        })

        runParallel(
          [
            (done) => writableStreamFinish(write, done),
            (done) => readableStreamEnd(parse, done),
          ],
          next
        )
      },
    ],
    (error) => {
      assert.ifError(error)
      assert(
        errorLogs.length === 0,
        `expected no build errors but got ${errorLogs}`
      )
      assert(nPagesBuilt === 1, `expected 1 built page but got ${nPagesBuilt}`)
      assert(nPages === 1, `expected 1 parsed page but got ${nPages}`)
      assert(width === WIDTH, `expected width to be ${WIDTH} but got ${width}`)
      assert(
        height === HEIGHT,
        `expected height to be ${HEIGHT} but got ${height}`
      )
      console.log('All tests succeeded')
      process.exit()
    }
  )
})
