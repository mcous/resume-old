// Render the HTML build to as a PDF
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'

import puppeteer from 'puppeteer'
import hummus from 'hummus'
import { temporaryFileTask } from 'tempy'

const pkg = createRequire(import.meta.url)('../package.json')

export const PDF_NAME = 'michael-cousins.pdf'

export async function renderPdf(url) {
  return temporaryFileTask(async outputFile =>
    renderPdfToFile(url, outputFile).then(() => fs.readFile(outputFile))
  )
}

export async function renderPdfToFile(url, outputFile) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await page.goto(url)
    await page.pdf({ path: outputFile, preferCSSPageSize: true })
  } finally {
    await browser.close()
  }

  const pdfWriter = hummus.createWriterToModify(outputFile)
  const info = pdfWriter.getDocumentContext().getInfoDictionary()

  info.author = pkg.author.name
  info.title = pkg.title
  info.subject = pkg.description

  pdfWriter.end()
}
