import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import chartEditor from '@kurkle/astro-chartjs-editor'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    chartEditor({
      runtime: './docs/chart-runtime.js',
      sourceBaseUrl: 'https://github.com/kurkle/chartjs-plugin-autocolors/blob/main/',
    }),
    starlight({
      customCss: ['./docs/styles/starlight.css'],
      description: 'Automatic color generation for Chart.js',
      favicon: '/favicon.ico',
      head: [
        {
          attrs: { href: '/favicon-96x96.png', rel: 'icon', sizes: '96x96', type: 'image/png' },
          tag: 'link',
        },
        {
          attrs: { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
          tag: 'link',
        },
        {
          attrs: { href: '/favicon.ico', rel: 'shortcut icon' },
          tag: 'link',
        },
        {
          attrs: { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
          tag: 'link',
        },
        {
          attrs: { href: '/site.webmanifest', rel: 'manifest' },
          tag: 'link',
        },
      ],
      sidebar: [
        {
          items: [
            { label: 'Getting Started', link: '/' },
            { label: 'Integration', link: '/integration/' },
            { label: 'Usage', link: '/usage/' },
          ],
          label: 'Guide',
        },
        {
          items: [
            { label: 'Basic', link: '/samples/bar/' },
            { label: 'Customize', link: '/samples/customize/' },
            { label: 'Offset', link: '/samples/offset/' },
            { label: 'Repeat', link: '/samples/repeat/' },
            { label: 'Update', link: '/samples/update/' },
          ],
          label: 'Samples',
        },
        {
          items: [
            {
              attrs: { rel: 'noopener noreferrer', target: '_blank' },
              label: 'Awesome Chart.js',
              link: 'https://github.com/chartjs/awesome',
            },
            {
              label: 'chartjs-chart-matrix',
              link: 'https://chartjs-chart-matrix.pages.dev/',
            },
            {
              label: 'chartjs-chart-sankey',
              link: 'https://chartjs-chart-sankey.pages.dev/',
            },
            {
              label: 'chartjs-chart-treemap',
              link: 'https://chartjs-chart-treemap.pages.dev/',
            },
            {
              label: 'chartjs-plugin-gradient',
              link: 'https://chartjs-plugin-gradient.pages.dev/',
            },
          ],
          label: 'Ecosystem',
        },
      ],
      social: [
        { href: 'https://github.com/kurkle/chartjs-plugin-autocolors', icon: 'github', label: 'GitHub' },
      ],
      title: 'chartjs-plugin-autocolors',
    }),
    mdx(),
  ],
  outDir: './dist/docs',
  publicDir: './docs/public',
  site: 'https://chartjs-plugin-autocolors.pages.dev',
})
