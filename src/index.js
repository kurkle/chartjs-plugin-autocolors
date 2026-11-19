import { hsv2rgb, rgbString } from '@kurkle/color'

function* hueGen() {
  yield 0
  while (true) {
    for (let i = 1; i < 10; i++) {
      const d = 1 << i
      for (let j = 1; j <= d; j += 2) {
        yield j / d
      }
    }
  }
}

function* colorGen(repeat = 1) {
  const hue = hueGen()
  let h = hue.next()
  while (!h.done) {
    let rgb = hsv2rgb(Math.round(h.value * 360), 0.6, 0.8)
    for (let i = 0; i < repeat; i++) {
      yield {
        background: rgbString({ a: 192, b: rgb[2], g: rgb[1], r: rgb[0] }),
        border: rgbString({ a: 144, b: rgb[2], g: rgb[1], r: rgb[0] }),
      }
    }
    rgb = hsv2rgb(Math.round(h.value * 360), 0.6, 0.5)
    for (let i = 0; i < repeat; i++) {
      yield {
        background: rgbString({ a: 192, b: rgb[2], g: rgb[1], r: rgb[0] }),
        border: rgbString({ a: 144, b: rgb[2], g: rgb[1], r: rgb[0] }),
      }
    }
    h = hue.next()
  }
}

function setColors(dataset, background, border, mode) {
  if (mode === 'data') {
    dataset.backgroundColor = background
    dataset.borderColor = border
  } else {
    dataset.backgroundColor = dataset.backgroundColor || background
    dataset.borderColor = dataset.borderColor || border
  }
  return dataset.backgroundColor === background && dataset.borderColor === border
}

function getNext(color, customize, context) {
  const c = color.next().value
  return applyCustomize(c, customize, context)
}

function applyCustomize(c, customize, context) {
  if (typeof customize === 'function') {
    return customize(Object.assign({ colors: c }, context))
  }
  return c
}

// A color is consumed only by a dataset that takes it, so the generated color
// is kept until then. `customize` is called for every dataset with that
// dataset's own index, as it receives the colors the dataset is about to get.
function datasetMode(chart, gen, customize, mode) {
  const datasets = chart.data.datasets
  let pending = null
  for (let datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
    pending = pending || gen.next()
    const c = applyCustomize(pending.value, customize, { chart, datasetIndex })
    if (setColors(datasets[datasetIndex], c.background, c.border, mode)) {
      pending = null
    }
  }
}

function dataMode(chart, gen, customize, mode) {
  const datasets = chart.data.datasets
  for (let datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
    const dataset = datasets[datasetIndex]
    const background = []
    const border = []
    for (let dataIndex = 0; dataIndex < dataset.data.length; dataIndex++) {
      const c = getNext(gen, customize, { chart, dataIndex, datasetIndex })
      background.push(c.background)
      border.push(c.border)
    }
    setColors(dataset, background, border, mode)
  }
}

function labelMode(chart, gen, customize, mode) {
  const colors = {}
  const datasets = chart.data.datasets
  for (let datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
    const dataset = datasets[datasetIndex]
    const label = dataset.label ?? ''
    if (!colors[label]) {
      colors[label] = getNext(gen, customize, {
        chart,
        dataIndex: undefined,
        datasetIndex,
        label,
      })
    }
    const c = colors[label]
    setColors(dataset, c.background, c.border, mode)
  }
}

const autocolorPlugin = {
  beforeUpdate(chart, args, options) {
    const { mode = 'dataset', enabled = true, customize, repeat } = options

    if (!enabled) {
      return
    }

    const gen = colorGen(repeat)

    if (options.offset) {
      // offset the color generation by n colors
      for (let i = 0; i < options.offset; i++) {
        gen.next()
      }
    }

    if (mode === 'label') {
      return labelMode(chart, gen, customize, mode)
    }
    if (mode === 'dataset') {
      return datasetMode(chart, gen, customize, mode)
    }
    return dataMode(chart, gen, customize, mode)
  },
  id: 'autocolors',
}

export { autocolorPlugin as default }
