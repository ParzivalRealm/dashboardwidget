import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DashboardWidgetComponent,
  Data,
  HistoricalData,
  HistoricalService,
  MultiLangTextService,
  OaRxJsFacade,
} from '@etm-professional-control/widget-development-kit';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { DemoSettings, DpConnectResultType } from '../demo-settings.model';
import { DemoUiComponent } from '../demo-ui/demo-ui.component';

@Component({
  providers: [DemoUiComponent],
  selector: 'wui-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent
  extends DashboardWidgetComponent<DemoSettings>
  implements OnInit, OnDestroy
{
  value$: Observable<DpConnectResultType[]> | null = null;

  property1 = '';
  property2 = false;
  property3 = 0;

  frontColorPath = '';
  subscriptions: Subscription[] = [];

  sumValue = 0; // current sum

  constructor(
    private oaRxJsFacade: OaRxJsFacade,

    public multiLangTextService: MultiLangTextService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupSettingsSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.disconnectFromExistingsDp();
  }

  /**
   * Checks if data path is set
   * @param data  Data | Data[] | undefined
   * @returns boolean
   */
  private isData(data: Data | Data[] | undefined): data is Data {
    return data &&
      (data as Data)?.dataPath !== undefined &&
      (data as Data)?.dataPath
      ? true
      : false;
  }

  /**
   * Checks if data is an array of data
   * @param data  Data | Data[] | undefined
   * @returns boolean
   */
  private isDataArray(data: Data | Data[] | undefined): data is Data[] {
    return Array.isArray(data) &&
      data.findIndex((dataConf) => dataConf.dataPath != '') !== -1
      ? true
      : false;
  }

  /**
   * Sets up the subscription to the settings
   */
  private setupSettingsSubscription() {
    this.startLoading();
    const sub = this.settings$.subscribe((_settings) => {
      if (this.settings) {
        this.property1 = this.settings.property1;
        this.property2 = this.settings.property2;
        this.property3 = this.settings.property3;
      }
      this.updateWidget();
    });
    this.subscriptions.push(sub);
  }

  /**
   * when settings change, reconnect to OA
   */
  private updateWidget() {
    if (this.settings) {
      if (
        this.isData(this.settings.data) ||
        this.isDataArray(this.settings.data)
      ) {
        this.connectToData();
      } else {
        this.disconnectFromExistingsDp();

        this.finishLoading();
      }
    }
  }

  /**
   * get updates from OA
   */
  private connectToData(): void {
    this.value$ = null;

    if (this.isDataArray(this.settings?.data)) {
      this.disconnectFromExistingsDp();

      const dpList = this.settings.data
        .filter((dataConf) => this.isData(dataConf))
        .map((dataConf) => dataConf.dataPath);

      this.value$ = this.oaRxJsFacade.dpConnect(dpList).pipe(
        map((resultObject) =>
          resultObject
            ? Object.keys(resultObject).map((key) => resultObject[key])
            : []
        ),
        distinctUntilChanged((a, b) => a.every((v, i) => v === b[i])),
        tap((values) => {
          this.sumValue = values.reduce<number>(
            (sum, val) => sum + (typeof val === 'number' ? val : 0),
            0
          );
        }),
        // TODO - in den settings des multiinputs, wenn zu mehreren dps verbunden wurde, kommen keine updates mehr in die vorschau
        shareReplay({ refCount: true, bufferSize: 1 })
      );

      // remove loading screen after some time
      // only query data which is already in the rx-state
      this.oaRxJsFacade
        .getDatabyDataPaths(dpList)
        .pipe(take(1), delay(150))
        .subscribe(() => this.finishLoading());
    }

    if (!this.value$) {
      // remove loading if no value$ is set
      this.finishLoading();
    }
  }

  /**
   * if value subscription is reset, dbDisconnect is called
   */
  private disconnectFromExistingsDp() {
    // this.value$ = null;
  }
}
