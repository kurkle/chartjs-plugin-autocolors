import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'

const { author, name, version, homepage, main, module, jsdelivr, license } = JSON.parse(
  readFileSync('./package.json')
)

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime())).getFullYear()} ${author}
 * Released under the ${license} license
 */`

const input = 'src/index.js'

const commonOutputOptions = {
  banner,
  format: 'umd',
  indent: false,
  name,
  sourcemap: true,
}

export default [
  // ESM
  {
    external: (_) => /node_modules/.test(_),
    input,
    output: {
      ...commonOutputOptions,
      file: module,
      format: 'esm',
    },
    plugins: [resolve()],
  },
  // UMD
  {
    input,
    output: {
      ...commonOutputOptions,
      file: main,
    },
    plugins: [resolve()],
  },
  // UMD minified
  {
    input,
    output: {
      ...commonOutputOptions,
      banner: undefined,
      file: jsdelivr,
    },
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner,
        },
      }),
    ],
  },
]
