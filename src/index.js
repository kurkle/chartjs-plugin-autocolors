import {hsv2rgb, rgbString} from '@kurkle/color';

function* hueGen() {
  yield 0;
  for (let i = 1; i < 10; i++) {
    const d = 1 << i;
    for (let j = 1; j <= d; j += 2) {
      yield j / d;
    }
  }
}

function* colorGen(repeat = 1) {
  const hue = hueGen();
  let h = hue.next();
  while (!h.done) {
    let rgb = hsv2rgb(Math.round(h.value * 360), 0.6, 0.8);
    for (let i = 0; i < repeat; i++) {
      yield {background: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 192}), border: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 144})};
    }
    rgb = hsv2rgb(Math.round(h.value * 360), 0.6, 0.5);
    for (let i = 0; i < repeat; i++) {
      yield {background: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 192}), border: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 144})};
    }
    h = hue.next();
  }
}

function setColors(dataset, background, border) {
  dataset.backgroundColor = dataset.backgroundColor || background;
  dataset.borderColor = dataset.borderColor || border;
}

function getNext(color, customize, context) {
  const c = color.next().value;
  if (typeof customize === 'function') {
    return customize(Object.assign({colors: c}, context));
  }
  return c;
}

export default {
  id: 'autocolors',
  beforeUpdate(chart, args, options) {
    const {mode = 'dataset', enabled = true, customize, repeat} = options;

    if (!enabled) {
      return;
    }

    if (!chart._autocolor) {
      chart._autocolor = colorGen(repeat);
      if (options.offset) {
        for (let i = 0; i < options.offset; i++) {
          chart._autocolor.next();
        }
      }
    }

    for (const dataset of chart.data.datasets) {
      if (dataset.backgroundColor && dataset.borderColor) {
        continue;
      }
      if (mode === 'dataset') {
        const c = getNext(chart._autocolor, customize, {chart, datasetIndex: dataset.index});
        setColors(dataset, c.background, c.border);
      } else {
        const background = [];
        const border = [];
        for (let i = 0; i < dataset.data.length; i++) {
          const c = getNext(chart._autocolor, customize, {chart, datasetIndex: dataset.index, dataIndex: i});
          background.push(c.background);
          border.push(c.border);
        }
        setColors(dataset, background, border);
      }
    }
  }
};
