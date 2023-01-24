module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 2048}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}))
    },
    options: {
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
  }
};
