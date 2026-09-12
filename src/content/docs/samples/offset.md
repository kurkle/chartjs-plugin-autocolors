---
title: Offset
description: Offset the color generation by a number of colors.
---

Use `offset` so multiple charts on the same page, each with their own autocolors instance, don't all start
from the same first color. The three charts below share the exact same data — only their `offset` differs —
so each one's palette starts one color further along than the last.

```js chart-editor
// <block:data:1>
const labels = ['Color']
const values = []
for (let i = 1; i <= 24; i++) {
  values.push(Utils.rand())
}
// </block:data>

// <block:config:0>
function makeConfig(offset) {
  const datasets = values.map((value, i) => ({
    label: `Bar ${i + 1}`,
    data: [value],
  }))
  return {
    type: 'bar',
    data: { labels, datasets },
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
          offset,
        },
        legend: false,
      },
    },
  }
}
// </block:config>

module.exports = {
  charts: [
    { title: 'offset: 0', config: makeConfig(0) },
    { title: 'offset: 1', config: makeConfig(1) },
    { title: 'offset: 2', config: makeConfig(2) },
  ],
}
```
