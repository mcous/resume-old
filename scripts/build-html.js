// compile the markdown source to HTML
'use strict'

const { read: readFile, write: writeFile } = require('to-vfile')
const rename = require('vfile-rename')
const unified = require('unified')
const parseMarkdown = require('remark-parse')
const parseHtml = require('rehype-parse')
const githubFlavorMarkdown = require('remark-gfm')
const mdastToHast = require('remark-rehype')
const stringifyHast = require('rehype-stringify')
const wrapHastDoc = require('rehype-document')
const formatHast = require('rehype-format')
const escapeHtml = require('escape-html')
const h = require('hastscript')
const octicons = require('octicons')

const pkg = require('../package.json')

const DOCUMENT_OPTIONS = {
  title: pkg.title,
  meta: [
    { name: 'description', content: escapeHtml(pkg.description) },
    { name: 'author', content: escapeHtml(pkg.author.name) },
  ],
  link: [
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
    { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64.png' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '128x128',
      href: '/favicon-128.png',
    },
  ],
}

function insertIconLinks(options) {
  const { pdfPublicPath, repositoryUrl } = options
  const svgParser = unified().use(parseHtml, { fragment: true, space: 'svg' })

  return (tree) => {
    tree.children.unshift(
      h('div.screen-only.fr.mt3.mr3', [
        h(
          'a.dib.w1.ml2',
          { 'aria-label': 'Source code', href: repositoryUrl },
          [svgParser.parse(octicons.repo.toSVG({ class: 'w-100 h-auto' }))]
        ),
        h('a.dib.w1.ml2', { 'aria-label': 'Resume PDF', href: pdfPublicPath }, [
          svgParser.parse(
            octicons['file-pdf'].toSVG({ class: 'w-100 h-auto' })
          ),
        ]),
      ])
    )

    return tree
  }
}

function buildHtml(buildParams) {
  const {
    markdownSource,
    outputDir,
    repositoryUrl,
    publicUrlPath,
    htmlOutputName,
    cssOutputName,
    pdfOutputName,
  } = buildParams

  const cssPublicPath = escapeHtml(`${publicUrlPath}${cssOutputName}`)
  const pdfPublicPath = escapeHtml(`${publicUrlPath}${pdfOutputName}`)
  const htmlOutputFile = { basename: htmlOutputName, dirname: outputDir }

  const htmlProcessor = unified()
    .use(parseMarkdown)
    .use(githubFlavorMarkdown)
    .use(mdastToHast)
    .use(insertIconLinks, { pdfPublicPath, repositoryUrl })
    .use(wrapHastDoc, { ...DOCUMENT_OPTIONS, css: [cssPublicPath] })
    .use(formatHast)
    .use(stringifyHast)

  return readFile(markdownSource, 'utf-8')
    .then((mdFile) => htmlProcessor.process(mdFile))
    .then((file) => writeFile(rename(file, htmlOutputFile)))
}

module.exports = { buildHtml }
