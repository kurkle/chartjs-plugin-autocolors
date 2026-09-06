# chartjs-plugin-autocolors

[![npm](https://img.shields.io/npm/v/chartjs-plugin-autocolors.svg)](https://www.npmjs.com/package/chartjs-plugin-autocolors)
[![release](https://img.shields.io/github/release/kurkle/chartjs-plugin-autocolors.svg?style=flat-square)](https://github.com/kurkle/chartjs-plugin-autocolors/releases/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/chartjs-plugin-autocolors.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kurkle_chartjs-plugin-autocolors&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kurkle_chartjs-plugin-autocolors)
[![documentation](https://img.shields.io/static/v1?message=Documentation&color=informational)](https://chartjs-plugin-autocolors.pages.dev)
![GitHub](https://img.shields.io/github/license/kurkle/chartjs-plugin-autocolors.svg)

[Chart.js](https://www.chartjs.org/) plugin that automatically assigns a color to each dataset, data point, or
label — no more picking colors by hand or reusing the same few colors across every chart, for anyone already
charting with Chart.js.

## Example

![Example chart](https://github.com/kurkle/chartjs-plugin-autocolors/raw/main/sample.png "Example chart")

## Installation

```bash
npm install chart.js chartjs-plugin-autocolors
```

Or via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-autocolors"></script>
```

## Quickstart

```js
import { Chart, registerables } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';

Chart.register(...registerables, autocolors);

new Chart(document.getElementById('chart'), {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Dataset 1', data: [12, 19, 8, 15] },
      { label: 'Dataset 2', data: [6, 11, 14, 9] },
    ],
  },
});
```

See more integration options (script tag, other module loaders) in the [documentation](https://chartjs-plugin-autocolors.pages.dev/integration/).

## Documentation

You can find documentation for chartjs-plugin-autocolors at [https://chartjs-plugin-autocolors.pages.dev/](https://chartjs-plugin-autocolors.pages.dev/). Modes, customization, offset, repeat, and browser compatibility are all covered there, not in this README — this file stays a quickstart.

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```bash
> npm install
```

The following commands will then be available from the repository root:

```bash
> npm run build        // build dist files
> npm run autobuild     // build and watch for changes
> npm test              // run all tests
> npm run lint          // perform code linting
```

## License

chartjs-plugin-autocolors is available under the [MIT license](https://opensource.org/licenses/MIT).
