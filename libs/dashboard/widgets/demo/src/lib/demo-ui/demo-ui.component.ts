import { Component, Input } from '@angular/core';
import { DpConnectResultTypes } from '../demo-settings.model';

@Component({
  selector: 'wui-demo-ui',
  templateUrl: './demo-ui.component.html',
  styleUrls: ['./demo-ui.component.scss'],
})
export class DemoUiComponent {
  @Input() value: DpConnectResultTypes | null = null;

  @Input() property1: string | undefined;
  @Input() property2: boolean | undefined;
  @Input() property3: number | undefined;

  @Input() sumValue: number | undefined;

  isString(value: DpConnectResultTypes | null): value is boolean | string {
    return !Array.isArray(value) && typeof value !== 'number' ? true : false;
  }

  isNumber(value: DpConnectResultTypes | null): value is number {
    return typeof value === 'number' ? true : false;
  }

  isDataArray(value: DpConnectResultTypes | null): value is [] {
    return Array.isArray(value) ? true : false;
  }
}
