import colorLib from '@kurkle/color'
import { Chart } from 'chart.js'

const lighten = (color: string, value: number) =>
  colorLib(color).lighten(value).rgbString() ?? color

const _chart = new Chart('test', {
  data: {
    datasets: [
      {
        data: [{ x: 1, y: 1 }],
        label: 'Test',
      },
    ],
  },
  options: {
    plugins: {
      autocolors: {
        customize(context) {
          const colors = context.colors
          return {
            background: lighten(colors.background, 0.5),
            border: lighten(colors.border, 0.5),
          }
        },
        enabled: true,
        mode: 'label',
        offset: 0,
        repeat: 1,
      },
    },
  },
  type: 'line',
})
