import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoLibModule } from '@etm-professional-control/dashboard/widgets/demo';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [DemoLibModule],
})
export default class AppModule {}
