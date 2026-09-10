/**
 * Emits the CommonJS half of the hand-written type declarations.
 *
 * `exports.require` serves the UMD bundle under a `.cjs` name, and that bundle
 * assigns the plugin with `module.exports =`. TypeScript reads the ESM
 * declarations reached through `require` as ESM (attw's FalseESM) and treats
 * `export default` (or a re-exported `as default`) as needing an extra
 * `.default` access at runtime, which would fail (attw's FalseExportDefault).
 * The require condition therefore gets its own `.d.cts` copies.
 *
 * Four rewrites make those copies compile rather than merely resolve:
 *
 *  1. Relative specifiers point at their `.cjs` counterparts, which a `.d.cts`
 *     resolves to `.d.cts`.
 *
 *  2. The default export becomes `export =`, matching `module.exports =`. That
 *     alone is not valid TypeScript while other exports remain in the file
 *     (TS2309), so the named types move into a namespace merged with the
 *     plugin — where a CommonJS consumer reaches them as members, which is what
 *     `export =` means.
 *
 *  3. Imports from a package whose types are ESM — chart.js — become type-only
 *     and carry `resolution-mode`, or a CommonJS declaration cannot reach them
 *     (TS1479 for a value import, TS1541 for a type-only one). The attribute is
 *     legal here only because the import is type-only: on a value import it
 *     needs `--module` to be esnext, node18, node20, nodenext or preserve, and
 *     `node16` is none of those (TS2823).
 *
 *  4. A `declare module 'chart.js'` augmentation resolves its own specifier in
 *     the enclosing file's mode, and no attribute syntax can override that. The
 *     block is dropped and pulled back in from the ESM twin of the same file,
 *     which resolves it in import mode.
 *
 * Without 2 to 4 the package still passes attw and publint — they check
 * resolution, not compilation — and still fails for a `skipLibCheck: false`
 * consumer.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'types'

const typeOnlyPackageImports = (source) =>
  source.replace(
    /import[ \t]+(?:type[ \t]+)?([^;'"]+?)[ \t]+from[ \t]+'([^.'][^']*)'[ \t]*;?/g,
    (_match, clause, specifier) =>
      `import type ${clause} from '${specifier}' with { 'resolution-mode': 'import' };`
  )

const endOfBlock = (source, from) => {
  let depth = 0
  let at = source.indexOf('{', from)

  do {
    depth += source[at] === '{' ? 1 : source[at] === '}' ? -1 : 0
    at += 1
  } while (depth > 0)

  return at
}

const withoutAugmentations = (source) => {
  let result = source
  let removed = false

  for (;;) {
    const start = result.search(/declare module '[^.'][^']*' \{/)
    if (start === -1) {
      return { removed, source: result }
    }

    result = result.slice(0, start) + result.slice(endOfBlock(result, start))
    removed = true
  }
}

// `export =` may not stand beside other exports, so the named types become
// members of a namespace that merges with the exported value.
const namespacedExports = (source) => {
  const exported = [...source.matchAll(/^export (?:interface|type|enum|class) (\w+)/gm)].map(
    (match) => match[1]
  )

  const withDefault = source
    .replace(/^export default (\w+)$/m, 'export = $1')
    .replace(/^export \{\s*(\w+)\s+as default\s*\}$/m, 'export = $1')

  const assignment = withDefault.match(/^export = (\w+)$/m)
  if (!assignment || exported.length === 0) {
    return withDefault
  }

  const members = [...exported].sort().join(', ')
  const namespace = `declare namespace ${assignment[1]} {\n  export { ${members} }\n}\n\n`

  return withDefault
    .replace(/^export (interface|type|enum|class) /gm, '$1 ')
    .replace(/^export = /m, `${namespace}export = `)
}

for (const name of readdirSync(dir).filter((file) => file.endsWith('.d.ts'))) {
  const relative = readFileSync(join(dir, name), 'utf8').replace(
    /(from\s+'\.\/[^']+)\.js'/g,
    "$1.cjs'"
  )

  const { removed, source } = withoutAugmentations(
    namespacedExports(typeOnlyPackageImports(relative))
  )
  const twin = name.replace(/\.d\.ts$/, '.js')
  const prefix = removed
    ? `import type {} from './${twin}' with { 'resolution-mode': 'import' };\n`
    : ''

  writeFileSync(
    join(dir, name.replace(/\.d\.ts$/, '.d.cts')),
    (prefix + source).replace(/\n{3,}/g, '\n\n')
  )
}
