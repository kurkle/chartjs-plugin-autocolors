import autocolors from '../../src/index.js'
import { acquireChart, releaseChart } from '../utils'

function run(mode, datasets) {
  const calls = []
  const chart = acquireChart(
    {
      data: {
        datasets,
        labels: ['a', 'b'],
      },
      options: {
        plugins: {
          autocolors: {
            customize(context) {
              calls.push({
                dataIndex: context.dataIndex,
                datasetIndex: context.datasetIndex,
                label: context.label,
              })
              return context.colors
            },
            mode,
          },
          legend: false,
        },
      },
      plugins: [autocolors],
      type: 'bar',
    },
    { canvas: { height: 128, width: 128 } }
  )
  releaseChart(chart)
  return calls
}

describe('customize context', () => {
  it('passes the dataset index in dataset mode, skipping datasets that keep their own colors', () => {
    const calls = run('dataset', [
      { data: [1, 2], label: 'A' },
      { backgroundColor: 'red', borderColor: 'blue', data: [3, 4], label: 'B' },
      { data: [5, 6], label: 'C' },
      { data: [7, 8], label: 'D' },
    ])

    // B keeps its colors, so the colors requested for it are reused for C.
    // Every call names the dataset that the returned colors are applied to.
    expect(calls.map((c) => c.datasetIndex)).toEqual([0, 1, 2, 3])
    for (const call of calls) {
      expect(call.dataIndex).toBeUndefined()
      expect(call.label).toBeUndefined()
    }
  })

  it('passes dataset and data index of the colored point in data mode', () => {
    const calls = run('data', [
      { data: [1, 2], label: 'A' },
      { data: [3, 4], label: 'B' },
      { data: [5, 6], label: 'C' },
    ])

    expect(calls.map((c) => [c.datasetIndex, c.dataIndex])).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
    ])
  })

  it('passes the index of the first dataset with the label in label mode', () => {
    const calls = run('label', [
      { data: [1, 2], label: 'A' },
      { data: [3, 4], label: 'B' },
      { data: [5, 6], label: 'A' },
      { data: [7, 8], label: 'C' },
    ])

    expect(calls).toEqual([
      { dataIndex: undefined, datasetIndex: 0, label: 'A' },
      { dataIndex: undefined, datasetIndex: 1, label: 'B' },
      { dataIndex: undefined, datasetIndex: 3, label: 'C' },
    ])
  })
})
