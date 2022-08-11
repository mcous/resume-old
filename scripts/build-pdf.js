import assert from 'node:assert'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'

import hummus from 'hummus'

import { HOST, PORT, CLIENT_DIST, createServer } from './serve.js'
import { renderPdfToFile } from './render-pdf.js'

const PDF_NAME = 'michael-cousins.pdf'
const PDF_OUTPUT_PATH = path.join(CLIENT_DIST, PDF_NAME)

const PPI = 72
const EXPECTED_WIDTH_IN = 8.5
const EXPECTED_HEIGHT_IN = 11

export async function buildPdf() {
  const app = await createServer('preview')
  const server = await app.listen(PORT)

  try {
    await renderPdfToFile(`http://${HOST}:${PORT}/resume/`, PDF_OUTPUT_PATH)
  } finally {
    server.close()
  }

  return PDF_OUTPUT_PATH
}

export function validatePdf(pdfPath) {
  const pdfReader = hummus.createReader(pdfPath)
  const pageCount = pdfReader.getPagesCount()

  assert(pageCount === 1, `Expected one PDF page, got ${pageCount}`)

  const [x, y, width, height] = pdfReader.parsePage(0).getMediaBox()
  const [widthIn, heightIn] = [width / PPI, height / PPI]

  assert(x === 0 && y === 0, `Expected origin (0, 0), got (${x}, ${y})`)
  assert(
    widthIn === 8.5 && heightIn === 11,
    `Expected page size (${EXPECTED_WIDTH_IN}", ${EXPECTED_HEIGHT_IN}"), got (${widthIn}, ${heightIn})`
  )
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  buildPdf()
    .then(outputPath => {
      validatePdf(outputPath)
      console.log(`Wrote PDF to ${outputPath}`)
    })
    .catch(error => {
      console.error('Error building PDF', error)
      process.exitCode = 1
    })
}
