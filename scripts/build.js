// generate build artifacts
'use strict'

const fs = require('fs/promises')

const { BUILD_PARAMS } = require('./build-params')
const { buildCss } = require('./build-css')
const { buildHtml } = require('./build-html')
const { buildPdf } = require('./build-pdf')

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
