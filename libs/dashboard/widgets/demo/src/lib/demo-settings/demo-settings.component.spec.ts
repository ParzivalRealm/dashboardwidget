import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ContextRegionFacade,
  DashboardFacade,
  DataSelectorFacade,
  DialogService,
  MultiLangTextService,
  OaRxJsFacade,
  OaRxJsService,
  SettingsFormElementsModule,
  WebUiNotificationsService,
} from '@etm-professional-control/widget-development-kit';
import { mockProvider } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SieButtonModule } from '@siemens-di-pa-sw/reusable-components-design-system/button';
import { SieFormModule } from '@siemens-di-pa-sw/reusable-components-design-system/form';
import { of } from 'rxjs';
import { DemoSettingsComponent } from './demo-settings.component';

describe('DemoSettingsComponent', () => {
  let component: DemoSettingsComponent;
  let fixture: ComponentFixture<DemoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoSettingsComponent],
      imports: [
        SieFormModule,
        SieButtonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        SettingsFormElementsModule,
      ],
      providers: [
        FormBuilder,
        mockProvider(DashboardFacade, {
          isSettingCollapsed$: of(true),
          collapseSettings: jest.fn(),
        }),

        mockProvider(ContextRegionFacade, {
          setDataSelectorVisibilities: jest.fn(),
        }),
        mockProvider(OaRxJsFacade, {
          dpConnect: jest.fn().mockReturnValue(of('value')),
          areDataMissing: jest.fn().mockReturnValue(of(false)),
          fetchConfig: jest.fn().mockReturnValue(of(null)),
          getConfigs: jest.fn().mockReturnValue(
            of({
              alias: 'test',
              description: 'desc',
              unit: 'km/h',
              format: '%0.2f',
            })
          ),
          locales$: of(['en']),
        }),
        mockProvider(MultiLangTextService, {
          getText: jest.fn().mockReturnValue(''),
          getLocale: jest.fn().mockReturnValue('en'),
        }),
        mockProvider(DataSelectorFacade, {
          getCnsDisplayName: jest.fn().mockReturnValue(of('name')),
        }),
        mockProvider(DialogService, { registerDialog: jest.fn() }),
        mockProvider(WebUiNotificationsService, {
          createMultiLangNotification: jest.fn(),
        }),
        provideMockStore({
          initialState: {
            dashboard: { isSettingCollapsed: false },
          },
        }),
        mockProvider(OaRxJsService, {
          dpGetAlias: jest.fn().mockReturnValue(of('test')),
          dpGetDescription: jest.fn().mockReturnValue(of('desc')),
          dpGetUnit: jest.fn().mockReturnValue(of('km/h')),
          dpGet: jest.fn().mockReturnValue(of(0)),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
