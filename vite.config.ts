import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import windiCSS from 'vite-plugin-windicss'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  appType: 'custom',
  base: '/resume/',
  plugins: [
    ssr({
      prerender: true,
      includeAssetsImportedByServer: true,
    }),
    preact(),
    windiCSS(),
  ],
})
