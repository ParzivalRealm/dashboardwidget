import {
  CreateWidgetSettingsFunc,
  DashboardWidgetType,
  Data,
  WidgetType,
} from '@etm-professional-control/widget-development-kit';
import { DemoSettings } from './demo-settings.model';

export const createWidgetSettings: CreateWidgetSettingsFunc<DemoSettings> =
  function (
    data: Data | Data[],
    widgetInformation: WidgetType,
    _jsonFileName: string
  ): DemoSettings {
    // will be called the first time a new widget is added to the dashboard to initially set config
    return {
      type: 'Demo' as DashboardWidgetType,
      ...(widgetInformation.defaultSettings as DemoSettings),

      data: [data] as Data[],
    };
  };
