---
title: Repeat
description: Color multiple adjacent datasets with the same color.
---

Use `repeat` when several adjacent datasets should share the same color before autocolors moves on to the
next one. The three charts below use the same 12 datasets, only `repeat` changes — 1, then 2, then 3 — so
the palette repeating at a different pace is visible side by side, with the legend showing which bars share
a color.

```js chart-editor title="Repeat: 1"
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
        repeat: 1,
      },
      title: {
        display: true,
        text: 'repeat: 1',
      },
    },
  },
}
// </block:config>

module.exports = {
  config,
}
```

```js chart-editor title="Repeat: 2"
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
        repeat: 2,
      },
      title: {
        display: true,
        text: 'repeat: 2',
      },
    },
  },
}
// </block:config>

module.exports = {
  config,
}
```

```js chart-editor title="Repeat: 3"
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
