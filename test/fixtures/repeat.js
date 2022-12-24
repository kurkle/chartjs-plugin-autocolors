module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 20}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}))
    },
    options: {
      borderWidth: 2,
      events: [], // disable events for easier image saving
      plugins: {
        legend: false,
        autocolors: {
          mode: 'data',
          repeat: 3
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
  }
};
