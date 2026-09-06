---
title: Update
description: autocolors reacts to data added after the chart is created.
---

`'data'` mode assigns a color per data point, which is the recommended mode for Pie / Doughnut charts. Colors
are (re-)generated on every update, so newly pushed data points get colored too.

```js chart-editor
// <block:config:0>
const config = {
  type: 'pie',
  data: {
    datasets: [
      {
        label: 'Pie 1',
        data: [],
      },
    ],
  },
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
    name: 'Update',
    handler(chart) {
      chart.data.datasets[0].data.push(1, 2, 3)
      chart.update()
    },
  },
]

module.exports = {
  actions,
  config,
}
```
