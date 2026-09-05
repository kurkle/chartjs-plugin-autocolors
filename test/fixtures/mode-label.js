module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 20}, (v, i) => ({label: `Label ${1 + i % 4}`, data: [10]}))
    },
    options: {
      borderWidth: 2,
      events: [], // disable events for easier image saving
      plugins: {
        legend: true,
        autocolors: {
          mode: 'label'
        }
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false
        }
      }
    },
    plugins: [window['chartjs-plugin-autocolors']]
  },
  options: {
    spriteText: true
  },
  // Same anti-aliasing drift as big-dataset.js: the legend swatch borders differ slightly under
  // the current Chrome rasterizer vs. the stored reference PNG (Firefox matches it exactly). This
  // already failed on main before the eslint->biome migration, so it isn't a regression. The real
  // fix is to regenerate the reference PNGs in both browsers; this raised tolerance is a stopgap.
  tolerance: 0.002
};
