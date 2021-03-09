// generate build artifacts
'use strict'

const path = require('path')
const githubUrl = require('github-url-from-git')
const escapeHtml = require('escape-html')

const pkg = require('../package.json')

const BUILD_PARAMS = {
  title: pkg.title,
  author: escapeHtml(pkg.author.name),
  description: escapeHtml(pkg.description),
  markdownSource: path.join(__dirname, '../resume.md'),
  cssSource: path.join(__dirname, '../resume.css'),
  outputDir: path.join(__dirname, '../public'),
  repositoryUrl: escapeHtml(githubUrl(pkg.repository.url)),
  publicUrlPath: '/resume/',
  htmlOutputName: 'index.html',
  cssOutputName: 'resume.css',
  pdfOutputName: 'mike-cousins.pdf',
  pdfRenderDelay: 500,

  get cssPublicPath() {
    return escapeHtml(`${this.publicUrlPath}${this.cssOutputName}`)
  },

  get pdfPublicPath() {
    return escapeHtml(`${this.publicUrlPath}${this.pdfOutputName}`)
  },

  get pdfOutputPath() {
    return path.join(this.outputDir, this.pdfOutputName)
  },
}

module.exports = { BUILD_PARAMS }
