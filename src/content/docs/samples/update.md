---
title: Update
description: autocolors reacts to data added after the chart is created.
---

`'data'` mode assigns a color per data point, which is the recommended mode for Pie / Doughnut charts. The
chart below starts with 5 slices, each already colored. Click **Add data** to push two more slices — the
new slices get their own colors, while the original 5 keep exactly the colors they already had.

```js chart-editor
// <block:data:1>
const data = {
  labels: ['A', 'B', 'C', 'D', 'E'],
  datasets: [
    {
      label: 'Pie 1',
      data: [3, 5, 2, 4, 6],
    },
  ],
}
// </block:data>

// <block:config:0>
const config = {
  type: 'pie',
  data,
  options: {
    plugins: {
      autocolors: {
        enabled: true,
        mode: 'data',
      },
    },
  },
}
// </block:config>

const actions = [
  {
    name: 'Add data',
    handler(chart) {
      chart.data.labels.push('F', 'G')
      chart.data.datasets[0].data.push(4, 7)
      chart.update()
    },
  },
]

module.exports = {
  actions,
  config,
}
```
