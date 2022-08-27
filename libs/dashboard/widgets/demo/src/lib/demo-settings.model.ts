import {
  DashboardBaseWidgetSettings,
  DashboardChartWidgetSettings,
  Data,
  HistoricalChartOptions,
  SettingSeries,
} from '@etm-professional-control/widget-development-kit';

/////////////////////////////////////
// multiinput .. e.g. svg
// historic .. e.g. value trend
// or no options selected .. e.g. label

export interface DemoSettings extends DashboardBaseWidgetSettings {
  data: Data[];

  property1: string;
  property2: boolean;
  property3: number;
}

export type DpConnectResultType = number | string | boolean | unknown;
export type DpConnectResultTypes = DpConnectResultType | DpConnectResultType[];
