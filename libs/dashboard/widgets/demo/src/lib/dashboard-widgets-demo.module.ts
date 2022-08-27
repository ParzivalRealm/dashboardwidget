import { CommonModule } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CreateWidgetSettingsFunc,
  DashboardWidgetModule,
  DashboardWidgetSettingsComponent,
  SettingsFormElementsModule,
} from '@etm-professional-control/widget-development-kit';
import { TranslateModule } from '@ngx-translate/core';
import { SieButtonModule } from '@siemens-di-pa-sw/reusable-components-design-system/button';
import { SieFormModule } from '@siemens-di-pa-sw/reusable-components-design-system/form';
import { createWidgetSettings as createWidgetSettings_ } from './createWidgetSettings';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { DemoSettings } from './demo-settings.model';
import { DemoSettingsComponent } from './demo-settings/demo-settings.component';
import { DemoUiComponent } from './demo-ui/demo-ui.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SettingsFormElementsModule,
    SieFormModule,
    SieButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DemoContainerComponent,
    DemoSettingsComponent,
    DemoUiComponent,
  ],
})
export class DemoLibModule extends DashboardWidgetModule<DemoSettings> {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  public createWidgetSettings: CreateWidgetSettingsFunc<DemoSettings> =
    createWidgetSettings_;

  public resolveWidget(): ComponentFactory<DemoContainerComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(
      DemoContainerComponent
    );
  }
  resolveWidgetSettings(): ComponentFactory<
    DashboardWidgetSettingsComponent<DemoSettings>
  > {
    return this.componentFactoryResolver.resolveComponentFactory(
      DemoSettingsComponent
    );
  }
}
