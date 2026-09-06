---
title: Customize
description: Customize the generated colors with a customize function.
---

Use `customize` to alter the colors autocolors generates, without giving up automatic assignment.

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

// <block:options:2>
const lighten = (color, value) => helpers.color(color).lighten(value).rgbString()

const options = {
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
      mode: 'dataset',
      customize(context) {
        const colors = context.colors
        return {
          background: lighten(colors.background, 0.5),
          border: lighten(colors.border, 0.5),
        }
      },
    },
  },
}
// </block:options>

// <block:config:0>
const config = {
  type: 'bar',
  data,
  options,
}
// </block:config>

module.exports = {
  config,
}
```
