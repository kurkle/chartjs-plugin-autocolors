import { Chart, registerables } from 'chart.js'
import { acquireChart, afterEvent, setup, triggerMouseEvent } from 'chartjs-test-utils'

// Karma loaded the UMD bundle, which self-registers every Chart.js
// controller, element, scale and core plugin (including the built-in Colors
// plugin, which the fixtures never disabled).
Chart.register(...registerables)

// Registers the image matchers, pins the backing store to CSS pixels so the
// reference PNGs stay comparable whatever the host display reports, and
// releases the charts a spec acquired once it ends.
setup({ Chart })

// The fixture configs and specs were written against Karma's global scope.
globalThis.Chart = Chart
globalThis.acquireChart = acquireChart
globalThis.afterEvent = afterEvent
globalThis.triggerMouseEvent = triggerMouseEvent
