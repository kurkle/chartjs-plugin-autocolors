module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 20}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}))
    },
    options: {
      borderWidth: 2,
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
