import { Injectable } from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Injectable()
export class WebsocketService {
  websocket: $WebSocket;

  constructor() {

  }

  open(url: string) {
    this.websocket = new $WebSocket(url);
    this.websocket.onMessage(this.onMessage, {autoApply: false});
  }

  close() {
    this.websocket.close(false);
  }

  forceClose() {
    this.websocket.close(true);
  }

  onMessage(messageEvent: MessageEvent) {
    console.log('Message angekommen: ', messageEvent);
  }

  sendSample() {
    let object = {
      type: "sonar2",
      url: "https://sonarcloud.io/",
      projectId: "abap-sample-projet"
    };
    this.websocket.send(JSON.stringify(object)).publish().connect();
  }
}
