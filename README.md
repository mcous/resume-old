# resume

[![Build Status][travis-shield]][travis]
[![devDependency status][david-dev-shield]][david-dev]

> A selection of Mike Cousins' accomplishments and skills

<http://mike.cousins.io/resume/>

This is where I keep my resume, because I will version control any aspect of my
life that I can. It's written in Markdown, because I will write Markdown for any
aspect of my life that I can. The Markdown is compiled to HTML, combined with
some CSS, and converted to PDF for convenient consumption.

## stuff

- [resume.md](./resume.md) - the resume
- [resume.css](./resume.css) - the style
- [lib](./lib) - artisinal, handcrafted development and build libraries

## deploy

Cut a new version and push to GitHub to tell the CI server to build and deploy
HTML, CSS, and PDF to GitHub pages:

1. `$ npm version <level> -m <reason>`
2. `$ git push --follow-tags`

## develop

- `$ npm install` - Install dev dependencies
- `$ npm start` - Start a live-reloading dev server
  - HTML: <http://localhost:8080/resume>
  - PDF: <http://localhost:8080/resume/mike-cousins.pdf>
- `$ npm test` - Test that the PDF converts, is 1 page, and is Letter size
- `$ npm run build` - Build HTML and PDF to `public`

### dev dependencies

Mad props to the stuff that makes it all possible:

- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing
  middleware
- [create-html](https://github.com/sethvincent/create-html): create an html file
  with one function call
- [electron](https://github.com/electron-userland/electron-prebuilt): Install
  prebuilt electron binaries for the command-line using npm
- [electron-html-to](https://github.com/bjrmatos/electron-html-to): Convert html
  to html/image using electron
- [end-or-error](https://github.com/stream-utils/end-or-error): Listen readable
  stream `end` or `error` event once
- [escape-html](https://github.com/component/escape-html): Escape string for use
  in HTML
- [express](https://github.com/expressjs/express): Fast, unopinionated,
  minimalist web framework
- [gh-pages](https://github.com/tschaub/gh-pages): Publish to a gh-pages branch
  on GitHub (or any other branch on any other remote)
- [github-url-from-git](https://github.com/visionmedia/node-github-url-from-git):
  Parse a github git url and return the github repo url
- [hummus](https://github.com/galkahana/HummusJS): Create, read and modify PDF
  files and streams
- [inject-lr-script](https://github.com/mattdesl/inject-lr-script): inject live
  reload into HTML content
- [marked](https://github.com/chjj/marked): A markdown parser built for speed
- [nodemailer](https://github.com/nodemailer/nodemailer): Easy as cake e-mail
  sending from your Node.js applications
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use
  during development of a node.js app.
- [octicons](https://github.com/primer/octicons): A scalable set of icons
  handcrafted with <3 by GitHub.
- [pdf2json](https://github.com/modesty/pdf2json): A PDF file parser that
  converts PDF binaries to text based JSON, powered by porting a fork of PDF.JS
  to Node.js
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node
  (like `rm -rf`)
- [run-parallel](https://github.com/feross/run-parallel): Run an array of
  functions in parallel
- [run-series](https://github.com/feross/run-series): Run an array of functions
  in series
- [run-waterfall](https://github.com/feross/run-waterfall): Run an array of
  functions in series, each passing its results to the next function (waterfall)
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [tiny-lr](https://github.com/mklabs/tiny-lr): Tiny LiveReload server,
  background-friendly
- [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Runs xvfb-run only if
  you need to, useful for Electron unit tests

## license

Copyright 2017 by Mike Cousins. All rights reserved for content; code shared
under the terms of the ISC license.

SVG icons are from [octicons][octicons] and used under the terms of their
[license][octicons-license].

### isc

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.RTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

[octicons]: https://octicons.github.com/
[octicons-license]: https://github.com/primer/octicons#license
[travis]: https://travis-ci.org/mcous/resume
[david-dev]: https://david-dm.org/mcous/resume?type=dev
[travis-shield]:
  https://img.shields.io/travis/mcous/resume.svg?style=flat-square&maxAge=3600
[david-dev-shield]:
  https://img.shields.io/david/dev/mcous/resume.svg?style=flat-square&maxAge=3600
