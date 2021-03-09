// compile the HTML build to PDF
'use strict'

const { read: readFile } = require('to-vfile')
const puppeteer = require('puppeteer')
const hummus = require('hummus')

function buildPdf(htmlFile, buildParams) {
  const { cssSource, pdfOutputPath, pdfRenderDelay } = buildParams

  let _browser
  let _page

  return puppeteer
    .launch()
    .then((browser) => {
      _browser = browser
      return browser.newPage()
    })
    .then((page) => {
      _page = page
      return page.setContent(htmlFile.contents)
    })
    .then(() => _page.addStyleTag({ path: cssSource }))
    .then(() => _page.waitForTimeout(pdfRenderDelay))
    .then(() => _page.pdf({ path: pdfOutputPath, preferCSSPageSize: true }))
    .then(() => _browser.close())
    .then(() => {
      const writer = hummus.createWriterToModify(pdfOutputPath)
      const info = writer.getDocumentContext().getInfoDictionary()

      info.author = buildParams.author
      info.title = buildParams.title
      info.subject = buildParams.description

      writer.end()
    })
    .then(() => readFile(pdfOutputPath))
}

module.exports = { buildPdf }
