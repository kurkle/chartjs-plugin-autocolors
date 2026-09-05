# chartjs-plugin-autocolors

*Automatic color generation for [Chart.js](https://www.chartjs.org)*

[![npm](https://img.shields.io/npm/v/chartjs-plugin-autocolors.svg)](https://www.npmjs.com/package/chartjs-plugin-autocolors)
[![release](https://img.shields.io/github/release/kurkle/chartjs-plugin-autocolors.svg?style=flat-square)](https://github.com/kurkle/chartjs-plugin-autocolors/releases/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/chartjs-plugin-autocolors.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-autocolors&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-autocolors)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-autocolors&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-autocolors)
![GitHub](https://img.shields.io/github/license/kurkle/chartjs-plugin-autocolors.svg)

The generation is based on Janus Troelsen's answer at [Stack Overflow](https://stackoverflow.com/a/13781114/10359775).

This plugin requires Chart.js 3.0.0 or later. Could work with v2, but it is not supported.

**NOTE** the plugin does not automatically register.

## Example

![Example chart](https://github.com/kurkle/chartjs-plugin-autocolors/raw/main/sample.png "Example chart")

## Installation

NPM:

```bash
npm i --save chartjs-plugin-autocolors
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-autocolors"></script>
```

## Usage

### loading

ESM

```js
import autocolors from 'chartjs-plugin-autocolors';
```

CDN

```js
const autocolors = window['chartjs-plugin-autocolors'];
```

### Registering

All charts

```js
Chart.register(autocolors);
```

Single chart

```js
const chart = new Chart(ctx, {
  // ...
  plugins: [
    autocolors
  ]
});
```

### Disabling (when registered for all charts)

If registered globally, it might be desirable to disable the autocolors for some charts

```js
const chart = new Chart(ctx, {
  // ...
  options: {
    plugins: {
      autocolors: {
        enabled: false
      }
    }
  }
});
```

### Mode

**NOTE:** `'dataset'` mode does not work properly for **Pie / Doughnut** charts, so using `'data'` mode with those charts is advised.

There are two modes, `'dataset'` (default) `'data'` and `'label'`

- In `'dataset'` mode, a new color is picked for each dataset.
- In `'data'` mode, an array of colors, equivalent to the length of data is provided for each dataset.
- In `'label'` mode, color is picked for each different dataset label.

```js
const chart = new Chart(ctx, {
  // ...
  options: {
    plugins: {
      autocolors: {
        mode: 'data'
      }
    }
  }
});
```

### Customize

A `customize` function can be provided to customize the generated colors.
The function is expected to return object containing `background` and `border` properties,
with values acceptable as colors by Chart.js.

```js
const lighten = (color, value) => Chart.helpers.color(color).lighten(value).rgbString();

const chart = new Chart(ctx, {
  // ...
  options: {
    plugins: {
      autocolors: {
        customize(context) {
          const colors = context.colors;
          return {
            background: lighten(colors.background, 0.5),
            border: lighten(colors.border, 0.5)
          };
        }
      }
    }
  }
});
```

### Offset

`offset` option can be used to offset the color generation by a number of colors.

```js
const chart = new Chart(ctx, {
  // ...
  options: {
    plugins: {
      autocolors: {
        offset: 5
      }
    }
  }
});
```

### Repeat

Sometimes you might need to color multiple adjacent datasets with same color. The `repeat` option is for that use case.


```js
const chart = new Chart(ctx, {
  // ...
  options: {
    plugins: {
      autocolors: {
        repeat: 2
      }
    }
  }
});
```

## Browser compatibility

This plugin uses a generator function, so it is not compatible with Internet Explorer.

## License

`chartjs-plugin-autocolors.js` is available under the [MIT license](https://github.com/kurkle/chartjs-plugin-autocolors/blob/main/LICENSE).
