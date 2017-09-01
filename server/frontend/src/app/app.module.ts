import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebsocketModule } from './websocket/websocket.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebsocketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
