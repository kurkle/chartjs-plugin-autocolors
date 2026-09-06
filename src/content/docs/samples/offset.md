---
title: Offset
description: Offset the color generation by a number of colors.
---

Use `offset` so multiple charts on the same page, each with their own autocolors instance, don't all start
from the same first color. Use the buttons below to switch the offset on the live chart.

```js chart-editor
// <block:data:1>
const labels = ['Color']
const datasets = []
for (let i = 1; i <= 24; i++) {
  datasets.push({
    label: `Bar ${i}`,
    data: [Utils.rand()],
  })
}
const data = { labels, datasets }
// </block:data>

// <block:config:0>
const config = {
  type: 'bar',
  data,
  options: {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    plugins: {
      autocolors: {
        offset: 0,
      },
      legend: false,
      title: {
        display: true,
        text: 'offset: 0',
      },
    },
  },
}
// </block:config>

function setOffset(chart, offset) {
  chart.options.plugins.autocolors.offset = offset
  chart.options.plugins.title.text = `offset: ${offset}`
  chart.update()
}

const actions = [
  { name: 'Offset: 0', handler: (chart) => setOffset(chart, 0) },
  { name: 'Offset: 1', handler: (chart) => setOffset(chart, 1) },
  { name: 'Offset: 2', handler: (chart) => setOffset(chart, 2) },
]

module.exports = {
  actions,
  config,
}
```
