import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HistoricalService,
  MultiLangTextService,
  OaRxJsFacade,
} from '@etm-professional-control/widget-development-kit';
import { mockProvider } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DpConnectResultTypes, DemoSettings } from '../demo-settings.model';
import { DemoContainerComponent } from './demo-container.component';

@Component({
  selector: 'wui-demo-ui',
  template: '<p>Mock Ui Component</p>',
})
class MockDemoUiComponent {
  @Input() settings: DemoSettings | null = null;
  @Input() value: DpConnectResultTypes | null = null;

  @Input() property1: string | undefined;
  @Input() property2: boolean | undefined;
  @Input() property3: number | undefined;

  @Input() sumValue: number | undefined;
}

describe('DemoContainerComponent', () => {
  let component: DemoContainerComponent;
  let fixture: ComponentFixture<DemoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockDemoUiComponent, DemoContainerComponent],
      providers: [
        mockProvider(OaRxJsFacade, {
          dpConnect: jest.fn().mockReturnValue(of('value')),
        }),
        mockProvider(MultiLangTextService, {
          getText: jest.fn().mockReturnValue(''),
        }),
        mockProvider(HistoricalService, {
          getHistoricalData: jest.fn().mockReturnValue(''),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
