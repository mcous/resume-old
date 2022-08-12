import path from 'node:path'
import process from 'node:process'
import url from 'node:url'

import express from 'express'
import { createServer as createViteServer } from 'vite'
import { renderPage } from 'vite-plugin-ssr'

import { renderPdf } from './render-pdf.js'

const ROOT = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..')

export const PORT = 5173
export const HOST = 'localhost'
export const CLIENT_DIST = path.join(ROOT, 'dist/client')

export async function createServer(mode) {
  const app = express()

  if (mode !== 'dev') {
    return app.use('/resume/', express.static(CLIENT_DIST))
  }

  const vite = await createViteServer({
    root: ROOT,
    server: { middlewareMode: true },
  })

  app.use(vite.middlewares)

  app.get('*', async (request, response, next) => {
    const url = request.originalUrl
    const pageContextInit = { url }
    const { httpResponse } = await renderPage(pageContextInit)

    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    response.status(statusCode).type(contentType).send(body)
  })

  app.get(`/*.pdf`, async (request, response) => {
    const pdfContents = await renderPdf(
      `${request.protocol}://${request.get('host')}/resume/`
    )
    response.status(200).type('application/pdf').send(pdfContents)
  })

  return app
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  const [mode = 'dev'] = process.argv.slice(2)

  createServer(mode)
    .then(app => app.listen(PORT))
    .then(() => {
      console.log(`Server listening at http://${HOST}:${PORT}/resume/`)
    })
    .catch(error => {
      console.error('Error starting server', error)
      process.exitCode = 1
    })
}
