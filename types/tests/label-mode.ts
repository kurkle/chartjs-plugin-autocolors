import { Chart } from 'chart.js';
import colorLib from '@kurkle/color';

const lighten = (color: string, value: number) => colorLib(color).lighten(value).rgbString();

const chart = new Chart('test', {
  type: 'line',
  data: {
    datasets: [{
      label: 'Test',
      data: [{ x: 1, y: 1 }],
    }]
  },
  options: {
    plugins: {
      autocolors: {
        enabled: true,
        mode: 'label',
        offset: 0,
        repeat: 1,
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
