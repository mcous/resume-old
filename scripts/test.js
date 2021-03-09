// test the PDF output size and page count
'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs/promises')
const PdfParser = require('pdf2json')

const { BUILD_PARAMS } = require('./build')

// 1 pdf unit is 16pt, there are 72pts in an inch, letter is 8.5in wide x 11in tall
const EXPECTED_WIDTH = (8.5 * 72) / 16
const EXPECTED_HEIGHT = (11 * 72) / 16

function test(buildParams) {
  const parser = new PdfParser()
  const pdfPath = path.join(buildParams.outputDir, buildParams.pdfOutputName)

  return fs
    .readFile(pdfPath)
    .then((contents) => {
      return new Promise((resolve, reject) => {
        parser
          .once('pdfParser_dataError', reject)
          .once('pdfParser_dataReady', resolve)
          .parseBuffer(contents)
      })
    })
    .then((pdfData) => {
      const pageCount = pdfData.formImage.Pages.length
      const width = pdfData.formImage.Width
      const height = pdfData.formImage.Pages[0]?.Height

      assert(pageCount === 1, `Expected a 1 page PDF, got ${pageCount}`)

      assert(
        width === EXPECTED_WIDTH,
        `Expected width to be ${EXPECTED_WIDTH}, got ${width}`
      )

      assert(
        height === EXPECTED_HEIGHT,
        `Expected width to be ${EXPECTED_HEIGHT}, got ${height}`
      )
    })
}

module.exports = { test }

if (require.main === module) {
  test(BUILD_PARAMS)
    .then(() => {
      console.log('PDF size tests succeeded')
      process.exitCode = 0
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
