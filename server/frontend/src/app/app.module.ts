import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebsocketModule } from './websocket/websocket.module';
import { AnalysisModule } from './analysis/analysis.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebsocketModule,
    AnalysisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
