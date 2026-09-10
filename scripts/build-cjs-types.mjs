/**
 * Emits the CommonJS half of the hand-written type declarations.
 *
 * `exports.require` serves the UMD bundle under a `.cjs` name, and that bundle
 * assigns the plugin with `module.exports =`. TypeScript reads the ESM
 * declarations reached through `require` as ESM (attw's FalseESM) and treats
 * `export default` (or a re-exported `as default`) as needing an extra
 * `.default` access at runtime, which would fail (attw's FalseExportDefault).
 * The require condition therefore gets its own `.d.cts` copies, with the
 * default export rewritten to `export =` and relative specifiers pointed at
 * their `.cjs` counterparts.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'types'

for (const name of readdirSync(dir).filter((f) => f.endsWith('.d.ts'))) {
  const source = readFileSync(join(dir, name), 'utf8')
  const rewritten = source
    .replace(/(from\s+'\.\/[^']+)\.js'/g, "$1.cjs'")
    .replace(/^export default (\w+)$/m, 'export = $1')
    .replace(/^export \{\s*(\w+)\s+as default\s*\}$/m, 'export = $1')
  writeFileSync(join(dir, name.replace(/\.d\.ts$/, '.d.cts')), rewritten)
}
