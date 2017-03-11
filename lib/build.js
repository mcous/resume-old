'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')
const runWaterfall = require('run-waterfall')
const runParallel = require('run-parallel')
const streamEnd = require('end-or-error')
const marked = require('marked')
const createHtml = require('create-html')
const createPdfConverter = require('electron-html-to')
const octicons = require('octicons')
const escapeHtml = require('escape-html')
const githubUrl = require('github-url-from-git')

const pkg = require('../package.json')

const REPO_HREF = escapeHtml(githubUrl(pkg.repository.url))
const LANG = 'en'
const HEAD = `
  <meta name='description' content='${escapeHtml(pkg.description)}'>
  <meta name='author' content='${escapeHtml(pkg.author.name)}'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>`

let pdfConverter

module.exports = {
  html: buildHtml,
  pdf: buildPdf
}

if (require.main === module) {
  const argv = require('./_argv')
  const mdSource = argv.mdSource
  const cssSource = argv.cssSource
  const pdfName = argv.pdfName
  const basePath = argv.basePath
  const outDir = argv.outDir
  const cssRelPath = `${basePath}/${path.basename(cssSource)}`
  const pdfRelPath = `${basePath}/${pdfName}`
  const htmlOut = path.join(outDir, 'index.html')
  const pdfOut = path.join(outDir, pdfName)

  runParallel([
    (done) => runWaterfall([
      (next) => buildHtml(mdSource, cssRelPath, pdfRelPath, next),
      (html, next) => fs.writeFile(htmlOut, html, next)
    ], done),
    (done) => runWaterfall([
      (next) => buildPdf(mdSource, `file://${cssSource}`, next),
      (pdf, next) => writePdfToFile(pdf, pdfOut, next)
    ], done)
  ], (error) => {
    pdfConverter && pdfConverter.kill()
    assert.ifError(error)
  })
}

// done = (error, html) => {}
function buildHtml (mdSource, cssPath, pdfPath, done) {
  if (typeof pdfPath === 'function') {
    done = pdfPath
    pdfPath = null
  }

  runWaterfall([
    (next) => fs.readFile(mdSource, 'utf8', next),
    (md, next) => next(null, createHtml({
      title: pkg.title,
      css: cssPath,
      lang: LANG,
      head: HEAD,
      body: iconLinks(pdfPath) + marked(md)
    }))
  ], done)
}

// done = (error, pdf) => {}
function buildPdf (mdSource, cssPath, done) {
  runWaterfall([
    (next) => buildHtml(mdSource, cssPath, next),
    (html, next) => htmlToPdf(html, next),
    (pdf, next) => {
      pdf.logs
        .filter((log) => log.level === 'warn' || log.level === 'error')
        .forEach((log) => console.error(log))
      next(null, pdf)
    }
  ], done)
}

// done = (error) => {}
function writePdfToFile (pdf, pdfOut, done) {
  streamEnd(pdf.stream.pipe(fs.createWriteStream(pdfOut)), done)
}

// done = (error, pdf) => {}
function htmlToPdf (html, done) {
  if (!pdfConverter) {
    pdfConverter = createPdfConverter({
      allowLocalFilesAccess: true,
      converterPath: createPdfConverter.converters.PDF
    })
  }

  const conversionOpts = {
    html: html,
    pdf: {
      marginsType: 1,
      pageSize: 'Letter',
      printBackground: true
    }
  }

  pdfConverter(conversionOpts, done)
}

function iconLinks (pdfPath) {
  const pdfHref = pdfPath || '#'

  return `
    <div class='screen-only fr mt3 mr3'>
      <a aria-label='pdf' href='${REPO_HREF}' class='dib w1 ml2' target='_blank'>
        ${octicons.repo.toSVG({class: 'w-100 h-auto'})}
        </a>
      <a aria-label='pdf' href='${pdfHref}' class='dib w1 ml2' target='_blank'>
        ${octicons['file-pdf'].toSVG({class: 'w-100 h-auto'})}
      </a>
    </div>`
}
