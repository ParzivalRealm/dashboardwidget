import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import {
  ContextRegionFacade,
  DashboardFacade,
  DashboardWidgetSettingsComponent,
  Data,
} from '@etm-professional-control/widget-development-kit';
import { ButtonType } from '@siemens-di-pa-sw/reusable-components-design-system/button';
import { Color } from '@siemens-di-pa-sw/reusable-components-design-system/color';
import { ContainerType } from '@siemens-di-pa-sw/reusable-components-design-system/container';
import { InputGroupSize } from '@siemens-di-pa-sw/reusable-components-design-system/form';
import { Icon } from '@siemens-di-pa-sw/reusable-components-design-system/icon';
import { debounceTime } from 'rxjs/operators';

import { DemoSettings } from '../demo-settings.model';

@Component({
  selector: 'wui-demo-settings',
  templateUrl: './demo-settings.component.html',
  styleUrls: ['./demo-settings.component.scss'],
})
export class DemoSettingsComponent
  extends DashboardWidgetSettingsComponent<DemoSettings>
  implements OnInit
{
  Icon = Icon;
  ButtonType = ButtonType;
  ContainerType = ContainerType;
  Color = Color;

  queryPostfixDisabled = false;
  queryAlertColor: Color = Color.Error;
  queryAlertIcon: Icon = Icon.CancelCircle;

  settingsForm = this.formBuilder.group({
    data: this.formBuilder.array([
      this.formBuilder.control({
        dataPath: null,
        dataType: null,
      }),
    ]),

    generalSettings: [this.getGeneralSetting()],
    generalDataSettings: [null],
    valuePrefix: [null],
    property1: [''],
    property2: [false],
    property3: [10],
  });

  InputGroupSize = InputGroupSize;

  constructor(
    private formBuilder: FormBuilder,
    dashboardFacade: DashboardFacade,
    contextRegionFacade: ContextRegionFacade
  ) {
    super(dashboardFacade, contextRegionFacade);
  }

  ngOnInit(): void {
    // Update form with previously stored settings
    if (this.settings) {
      // remove first, empty series
      this.series.removeAt(0);
      // fill in each data series
      this.settings?.data?.forEach((dataConfg) => this.addSeries(dataConfg));

      // update all form fields
      this.settingsForm.patchValue(this.settings);
    }

    // any form changes will be forwarded to container component after some time
    this.subscriptions.push(
      this.settingsForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((settings) => {
          this.emitSettings(settings);
          this.updateFormState(this.settingsForm);
        })
    );

    this.resetFromState(this.settingsForm);
    this.updateFormState(this.settingsForm);
    this.emitSettings(this.settingsForm.value);
    super.ngOnInit();
  }

  // multiple inputs

  get series(): FormArray {
    // return this.settings.data;
    return this.settingsForm.get('data') as FormArray;
  }

  // eslint-disable-next-line max-lines-per-function
  addSeries(data?: Data) {
    const series = this.series;

    if (series?.controls?.length >= 10) {
      return;
    }

    series.push(
      this.formBuilder.control({
        dataPath: data ? data.dataPath : null,
        dataType: data ? data.dataType : null,
      })
    );
  }

  removeSerie(serie: AbstractControl) {
    const series = this.series;
    const idx = series.controls.findIndex((seriesItem) => seriesItem === serie);
    if (idx > -1) {
      series.removeAt(idx);
    }
  }

  // multiple inputs end
}
