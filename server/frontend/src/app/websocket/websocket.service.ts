import { Injectable } from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Injectable()
export class WebsocketService {

  get websocket(): $WebSocket {
    return this._websocket;
  }

  private _websocket: $WebSocket;

  constructor() {

  }

  open(url: string) {
    this._websocket = new $WebSocket(url);
    this._websocket.setSend4Mode(WebSocketSendMode.Direct);
  }

  close() {
    this._websocket.close(false);
  }

  forceClose() {
    this._websocket.close(true);
  }

  send(object: Object) {
    this._websocket.send(JSON.stringify(object));
  }
}
