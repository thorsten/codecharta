import {Injectable} from '@angular/core';
import {WebsocketService} from "../websocket/websocket.service";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {SonarAnalysisRequest} from "./model/SonarAnalysisRequest";

@Injectable()
export class AnalysisService {

  constructor(private websocketService: WebsocketService) {
  }

  websocket(): $WebSocket {
    return this.websocketService.websocket;
  }

  startSonarImporter(request: SonarAnalysisRequest) {
    this.websocketService.send(request);
  }

  open(url: string) {
    this.websocketService.open(url);

  }

  close() {
    this.websocketService.close();
  }

}
