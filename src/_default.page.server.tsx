import { render as renderToString } from 'preact-render-to-string'
import { escapeInject as html, dangerouslySkipEscape } from 'vite-plugin-ssr'

import type { ComponentType } from 'preact'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import '@fontsource/open-sans/variable.css'
import 'virtual:windi.css'

interface PageContext extends PageContextBuiltIn {
  Page: ComponentType
  exports: {
    title: string
    description: string
  }
}

export function render(pageContext: PageContext): unknown {
  const { Page, exports: pageExports } = pageContext
  const pageHtml = renderToString(<Page />)

  const documentHtml = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${pageExports.title}</title>
        <meta name="description" content="${pageExports.description}" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body bg="gray-800">
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>
  `

  return { documentHtml }
}
