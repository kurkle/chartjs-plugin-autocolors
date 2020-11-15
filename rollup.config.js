/* eslint-env es6 */

import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import {name, version, homepage, main} from './package.json';

const input = 'src/index.js';

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} Jukka Kurkela
 * Released under the MIT License
 */`;

export default [
  {
    input,
    plugins: [
      resolve()
    ],
    output: {
      name,
      file: main,
      banner,
      format: 'umd',
      indent: false
    }
  },
  {
    input,
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    output: {
      name,
      file: main.replace('.js', '.min.js'),
      format: 'umd',
      sourcemap: true,
      indent: false
    }
  },
  {
    input,
    plugins: [
      resolve()
    ],
    output: {
      name,
      file: main.replace('.js', '.esm.js'),
      banner,
      format: 'esm',
      indent: false
    }
  },
];
