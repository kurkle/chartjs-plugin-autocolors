---
title: Basic
description: Automatic colors assigned to each dataset.
---

With autocolors registered, each dataset gets a color automatically — no `backgroundColor` or `borderColor`
needed.

```js chart-editor
// <block:data:1>
const labels = ['Color']
const datasets = []
for (let i = 1; i <= 20; i++) {
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
  },
}
// </block:config>

module.exports = {
  config,
}
```
