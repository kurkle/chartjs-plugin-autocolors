---
title: Repeat
description: Color multiple adjacent datasets with the same color.
---

Use `repeat` when several adjacent datasets should share the same color before autocolors moves on to the
next one. Use the buttons below to switch the repeat count on the live chart.

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
        repeat: 1,
      },
      legend: false,
      title: {
        display: true,
        text: 'repeat: 1',
      },
    },
  },
}
// </block:config>

function setRepeat(chart, repeat) {
  chart.options.plugins.autocolors.repeat = repeat
  chart.options.plugins.title.text = `repeat: ${repeat}`
  chart.update()
}

const actions = [
  { name: 'Repeat: 1', handler: (chart) => setRepeat(chart, 1) },
  { name: 'Repeat: 2', handler: (chart) => setRepeat(chart, 2) },
  { name: 'Repeat: 3', handler: (chart) => setRepeat(chart, 3) },
]

module.exports = {
  actions,
  config,
}
```
