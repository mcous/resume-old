# resume

[![Build Status][ci-badge]][ci]
[![devDependency status][dev-deps-badge]][dev-deps]

> A selection of Mike Cousins' accomplishments and skills

<http://mike.cousins.io/resume/>

This is my resume, written in Markdown! The Markdown source is compiled to HTML,
combined with some CSS, and converted to PDF for convenient consumption.

[ci]:
  https://github.com/mcous/resume/actions/workflows/main.yml?query=branch%3Amain
[dev-deps]: https://david-dm.org/mcous/resume?type=dev
[ci-badge]:
  https://img.shields.io/github/workflow/status/mcous/resume/CI?style=flat-square
[dev-deps-badge]:
  https://img.shields.io/david/dev/mcous/resume.svg?style=flat-square

## stuff

- [resume.md](./resume.md) - the resume
- [resume.css](./resume.css) - the styling
- [scripts](./scripts) - development scripts

## deploy

Cut a new version and push to GitHub to tell the CI server to build and deploy
HTML, CSS, and PDF to GitHub pages:

1. `$ npm version <level> -m <reason>`
2. `$ git push --follow-tags`

## develop

[Node.js] v14 is required for development.

```shell
# install development dependencies
npm install

# start a live-reloading development server
npm start

# build HTML, CSS, and PDF to `public`
npm run build

# test the output in `public`
npm run test

# format and lint
npm run format
npm run lint
```

[node.js]: https://nodejs.org

## license

Copyright 2021 by Mike Cousins. All rights reserved for content; code shared
under the terms of the ISC license.

SVG icons are from [octicons][octicons] and used under the terms of their
[license][octicons-license].

[octicons]: https://octicons.github.com/
[octicons-license]: https://github.com/primer/octicons#license

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
