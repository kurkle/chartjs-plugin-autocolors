import { Chart, ChartType, Plugin } from 'chart.js'

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    autocolors?: AutocolorsOptions
  }
}

export interface ColorsDescriptor {
  background: string
  border: string
}

export interface AutocolorsOptions {
  enabled?: boolean
  mode?: 'dataset' | 'data' | 'label'
  offset?: number
  repeat?: number
  customize?: (ctx: AutocolorsContext, options: AutocolorsOptions) => ColorsDescriptor
}

export interface AutocolorsContext {
  chart: Chart
  colors: ColorsDescriptor
  dataIndex?: number
  datasetIndex: number
}

declare const autocolorPlugin: Plugin

/**
 * Exports the plugin class as default
 */
export { autocolorPlugin as default }
