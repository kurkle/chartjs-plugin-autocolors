# chartjs-plugin-autocolors

*Automatic color generation for [Chart.js](https://www.chartjs.org)*

The generation is based on Janus Troelsen's answer at [Stack Overflow](https://stackoverflow.com/a/13781114/10359775).

This plugin requires Chart.js 3.0.0 or later. Could work with v2, but it is not supported.

**NOTE** the plugin does not automatically register.

## Example

![Example chart](https://github.com/kurkle/chartjs-plugin-autocolors/raw/master/sample.png "Example chart")

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

There are two modes, `'dataset'` (default) and `'data'`

- In `'dataset'` mode, a new color is picked for each dataset.
- In `'data'` mode, an array of colors, equivalent to the length of data is provided for each dataset.

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

## Browser compatibility

This plugin uses a generator function, so it is not compatible with Internet Explorer.

## License

`chartjs-plugin-autocolors.js` is available under the [MIT license](https://github.com/kurkle/chartjs-plugin-autocolors/blob/master/LICENSE).
