// serve build artifacts
'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const tinyLr = require('tiny-lr')
const injectLr = require('inject-lr-script')
const bodyParser = require('body-parser')

const pkg = require('../package.json')
const {
  BUILD_PARAMS,
  ensureOutputDir,
  buildCss,
  buildHtml,
  buildPdf,
} = require('./build')

const SERVER_PARAMS = {
  ...BUILD_PARAMS,
  outputDir: path.join(__dirname, '../.server-cache'),
  serverHost: pkg.config.server.host,
  serverPort: pkg.config.server.port,
}

function createServer(serverParams) {
  const app = express()

  return app
    .use(injectLr({ port: serverParams.port }))
    .use(bodyParser.json())
    .use(tinyLr.middleware({ app: app }))
    .get(serverParams.publicUrlPath, html)
    .get(`${serverParams.publicUrlPath}${serverParams.htmlOutputName}`, html)
    .get(`${serverParams.publicUrlPath}${serverParams.cssOutputName}`, css)
    .get(`${serverParams.publicUrlPath}${serverParams.pdfOutputName}`, pdf)

  function html(req, res, next) {
    const htmlBuild = buildHtml(serverParams)
    const cssBuild = buildCss(serverParams)

    Promise.all([htmlBuild, cssBuild])
      .then(([htmlFile]) => {
        res.send(htmlFile.contents)
      })
      .catch(next)
  }

  function css(req, res, next) {
    buildCss(serverParams)
      .then((cssFile) => res.type('css').send(cssFile.contents))
      .catch(next)
  }

  function pdf(req, res, next) {
    const htmlBuild = buildHtml(serverParams)
    const pdfBuild = htmlBuild.then((htmlFile) =>
      buildPdf(htmlFile, serverParams)
    )

    pdfBuild.then((pdf) => res.type('pdf').send(pdf.contents)).catch(next)
  }
}

function handleChange(change, path) {
  console.log(`${path} ${change}d`)
  tinyLr.changed(path)
}

module.exports = { createServer }

if (require.main === module) {
  const params = SERVER_PARAMS
  const app = createServer(params)
  const url = `http://${params.serverHost}:${params.serverPort}${params.publicUrlPath}`

  ensureOutputDir(params)
    .then(() => {
      app
        .listen({ host: params.serverHost, port: params.serverPort }, () =>
          console.log(`Serving at ${url}`)
        )
        .once('error', (error) => console.error(error))
    })
    .catch(console.error)

  fs.watch(params.markdownSource, handleChange)
  fs.watch(params.cssSource, handleChange)
}
