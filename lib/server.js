'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const tinyLr = require('tiny-lr')
const injectLr = require('inject-lr-script')
const bodyParser = require('body-parser')

const pkg = require('../package.json')
const build = require('./build')

const HOST = pkg.config.server.host
const PORT = pkg.config.server.port
const URI = `http://${HOST}:${PORT}`

module.exports = createServer

if (require.main === module) {
  const argv = require('./_argv')
  const basePath = argv.basePath
  const mdSource = argv.mdSource
  const cssSource = argv.cssSource
  const app = createServer(basePath, mdSource, cssSource, argv.pdfName)

  app
    .listen({host: HOST, port: PORT}, () => console.log(`Serving at ${URI}${basePath}`))
    .once('error', (error) => console.error(error))

  fs.watch(argv.mdSource, handleChange)
  fs.watch(argv.cssSource, handleChange)
}

function createServer (basePath, mdSource, cssSource, pdfName) {
  const cssName = path.basename(cssSource)
  const cssRelPath = `${basePath}/${cssName}`
  const pdfRelPath = `${basePath}/${pdfName}`
  const app = express()

  return app
    .use(injectLr({port: PORT}))
    .use(bodyParser.json())
    .use(tinyLr.middleware({app: app}))
    .get(basePath, index)
    .get(pdfRelPath, pdf)
    .get(cssRelPath, css)
    .use(basePath, express.static(path.join(__dirname, '../static')))

  function index (req, res) {
    build.html(mdSource, cssRelPath, pdfRelPath, (error, html) => {
      if (error) {
        return res.status(500).send(error)
      }

      res.send(html)
    })
  }

  function css (req, res) {
    res.sendFile(cssSource)
  }

  function pdf (req, res) {
    const cssUri = `${URI}${cssRelPath}`

    build.pdf(mdSource, cssUri, (error, pdf) => {
      if (error) {
        return res.status(500).send(error)
      }

      pdf.stream.pipe(res)
    })
  }
}

function handleChange (change, path) {
  console.log(`${path} ${change}d`)

  tinyLr.changed(path)
}
