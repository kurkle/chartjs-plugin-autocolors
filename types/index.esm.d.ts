import { Chart, ChartType } from 'chart.js';

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    autocolors?: AutocolorsOptions
  }
}

interface ColorsDescriptor {
  background: string
  border: string
}

interface AutocolorsOptions {
  enabled?: boolean,
  mode?: 'dataset' | 'data' | 'label',
  offset?: number,
  repeat?: number,
  customize?: (ctx: AutocolorsContext, options: AutocolorsOptions) => ColorsDescriptor
}

interface AutocolorsContext {
  chart: Chart
  colors: ColorsDescriptor
  dataIndex?: number
  datasetIndex: number
}
