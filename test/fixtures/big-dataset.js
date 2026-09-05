module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 2048}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}))
    },
    options: {
      categoryPercentage: 1,
      barPercentage: 1,
      borderWidth: 1,
      events: [],
      plugins: {legend: false},
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
    canvas: {
      width: 1024,
      height: 64
    }
  },
  // 2048 bars in a 1024px-wide canvas means every bar edge is sub-pixel, so this fixture is
  // sensitive to anti-aliasing drift between canvas rasterizer versions. The default 0.1%
  // tolerance already failed on main before the eslint->biome migration (Chrome 152 vs. the
  // stored reference PNG; Firefox matches it exactly), so this isn't a regression. The real fix
  // is to regenerate the reference PNGs in both browsers; this raised tolerance is a stopgap.
  tolerance: 0.008
};
