import autocolors from '../../src/index.js'
import { acquireChart, releaseChart } from '../utils'

describe('mode: data', () => {
  it('sets per-point borderColor (and not a stray "border" property)', () => {
    const chart = acquireChart(
      {
        data: {
          datasets: [{ data: [1, 2], label: 'Dataset 1' }],
          labels: ['a', 'b'],
        },
        options: {
          plugins: {
            autocolors: {
              mode: 'data',
            },
            legend: false,
          },
        },
        plugins: [autocolors],
        type: 'bar',
      },
      { canvas: { height: 128, width: 128 } }
    )

    try {
      const dataset = chart.data.datasets[0]

      expect(Array.isArray(dataset.borderColor)).toBe(true)
      expect(dataset.borderColor).toHaveLength(2)
      for (const color of dataset.borderColor) {
        expect(typeof color).toBe('string')
        expect(color.length).toBeGreaterThan(0)
      }

      expect(Array.isArray(dataset.backgroundColor)).toBe(true)
      expect(dataset.backgroundColor).toHaveLength(2)

      // The bug this guards against wrote the per-point border colors to a
      // `border` property, which Chart.js never reads, instead of `borderColor`.
      expect(dataset.border).toBeUndefined()
    } finally {
      releaseChart(chart)
    }
  })
})
