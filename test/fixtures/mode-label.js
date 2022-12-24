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
  }
};
