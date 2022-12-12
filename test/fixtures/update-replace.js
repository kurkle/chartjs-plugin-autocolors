const width = 512;
const height = 512;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

module.exports = {
  config: {
    type: 'bar',
    data: {
      labels: ['color'],
      datasets: Array.from({length: 5}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}))
    },
    options: {
      borderWidth: 2,
      events: [], // disable events for easier image saving
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
      width,
      height
    },
    run(chart) {
      const snapWidth = width;
      const snapHeight = height / 2;
      // Initial chart
      ctx.drawImage(chart.canvas, 0, 0, snapWidth, snapHeight);

      // Update
      chart.data.datasets = Array.from({length: 10}, (v, i) => ({label: `Bar ${i + 1}`, data: [10]}));
      chart.update();
      ctx.drawImage(chart.canvas, 0, snapHeight, snapWidth, snapHeight);

      // Modify the chart contents to contain both snapshots
      Chart.helpers.clearCanvas(chart.canvas);
      chart.ctx.drawImage(canvas, 0, 0);
    }
  }
};
