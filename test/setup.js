import { Chart, registerables } from 'chart.js'

import { acquireChart, afterEvent, imageMatchers, releaseCharts, triggerMouseEvent } from './utils'

// Karma loaded the UMD bundle, which self-registers every Chart.js
// controller, element, scale and core plugin (including the built-in Colors
// plugin, which the fixtures never disabled).
Chart.register(...registerables)

// The fixture configs and specs were written against Karma's global scope.
globalThis.Chart = Chart
globalThis.acquireChart = acquireChart
globalThis.afterEvent = afterEvent
globalThis.triggerMouseEvent = triggerMouseEvent

// Pin the backing store to CSS pixels so the reference PNGs stay comparable
// whatever the host display reports.
Chart.defaults.devicePixelRatio = 1

expect.extend(imageMatchers)

afterEach(() => {
  releaseCharts()
})
