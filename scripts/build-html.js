// compile the markdown source to HTML
'use strict'

const octicons = require('octicons')
const unified = require('unified')
const h = require('hastscript')
const parseMarkdown = require('remark-parse')
const parseHtml = require('rehype-parse')
const githubFlavorMarkdown = require('remark-gfm')
const mdastToHast = require('remark-rehype')
const wrapHastDoc = require('rehype-document')
const formatHast = require('rehype-format')
const stringifyHast = require('rehype-stringify')
const rename = require('vfile-rename')
const { read: readFile, write: writeFile } = require('to-vfile')

function getDocumentOptions(buildParams) {
  const { title, author, description, cssPublicPath } = buildParams

  return {
    title: title,
    css: [cssPublicPath],
    meta: [
      { name: 'author', content: author },
      { name: 'description', content: description },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '64x64',
        href: '/favicon-64.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '128x128',
        href: '/favicon-128.png',
      },
    ],
  }
}

function insertIconLinks(buildParams) {
  const { pdfPublicPath, repositoryUrl } = buildParams
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
  const { markdownSource, outputDir, htmlOutputName } = buildParams

  const htmlProcessor = unified()
    .use(parseMarkdown)
    .use(githubFlavorMarkdown)
    .use(mdastToHast)
    .use(insertIconLinks, buildParams)
    .use(wrapHastDoc, getDocumentOptions(buildParams))
    .use(formatHast)
    .use(stringifyHast)

  return readFile(markdownSource, 'utf-8')
    .then((mdFile) => htmlProcessor.process(mdFile))
    .then((file) =>
      writeFile(rename(file, { dirname: outputDir, basename: htmlOutputName }))
    )
}

module.exports = { buildHtml }
