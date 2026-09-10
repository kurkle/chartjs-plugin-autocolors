import { Chart, registerables } from 'chart.js'

import autocolorPlugin from '../index.esm'

// Locks in that `types/index.esm.d.ts` keeps describing a default export,
// matching how the ESM bundle and the README's `import autocolors from
// 'chartjs-plugin-autocolors'` example use the plugin. The CommonJS half of
// this contract (`export =` in the generated `.d.cts`) is covered by attw,
// not by tsc, since `require()` consumers aren't reachable from this file.
Chart.register(...registerables, autocolorPlugin)
