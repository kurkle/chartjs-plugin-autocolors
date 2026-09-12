---
title: Offset
description: Offset the color generation by a number of colors.
---

Use `offset` so multiple charts on the same page, each with their own autocolors instance, don't all start
from the same first color. Try the control below to switch the offset on the live chart.

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
    },
  },
}
// </block:config>

module.exports = {
  config,
  choices: [{ path: 'options.plugins.autocolors.offset', values: [0, 1, 2], control: 'radio' }],
}
```
