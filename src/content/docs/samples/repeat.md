---
title: Repeat
description: Color multiple adjacent datasets with the same color.
---

Sometimes you might need to color multiple adjacent datasets with the same color. The `repeat` option is for
that use case — try changing it in the editor below and see the palette repeat at a different pace.

```js chart-editor
// <block:data:1>
const labels = ['Color']
const datasets = []
for (let i = 1; i <= 12; i++) {
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
        repeat: 3,
      },
      title: {
        display: true,
        text: 'repeat: 3',
      },
    },
  },
}
// </block:config>

module.exports = {
  config,
}
```
