// generate build artifacts
'use strict'

const fs = require('fs/promises')
const path = require('path')
const githubUrl = require('github-url-from-git')
const escapeHtml = require('escape-html')

const pkg = require('../package.json')
const { buildCss } = require('./build-css')
const { buildHtml } = require('./build-html')
const { buildPdf } = require('./build-pdf')

const BUILD_PARAMS = {
  title: pkg.title,
  author: pkg.author.name,
  description: pkg.description,
  markdownSource: path.join(__dirname, '../resume.md'),
  cssSource: path.join(__dirname, '../resume.css'),
  outputDir: path.join(__dirname, '../public'),
  repositoryUrl: escapeHtml(githubUrl(pkg.repository.url)),
  publicUrlPath: '/resume/',
  htmlOutputName: 'index.html',
  cssOutputName: 'resume.css',
  pdfOutputName: 'mike-cousins.pdf',
  pdfRenderDelay: 500,
}

function ensureOutputDir(buildParams) {
  return fs.mkdir(buildParams.outputDir, { recursive: true })
}

function build(buildParams) {
  const cssBuild = buildCss(buildParams)
  const htmlBuild = buildHtml(buildParams)
  const pdfBuild = htmlBuild.then((htmlFile) => buildPdf(htmlFile, buildParams))

  return ensureOutputDir(buildParams).then(() =>
    Promise.all([cssBuild, htmlBuild, pdfBuild])
  )
}

module.exports = {
  BUILD_PARAMS,
  ensureOutputDir,
  build,
  buildCss,
  buildHtml,
  buildPdf,
}

if (require.main === module) {
  build(BUILD_PARAMS)
    .then((files) => {
      console.log(`Built ${files.map((f) => f.basename).join(', ')}`)
      process.exitCode = 0
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
