import { Component } from '@angular/core';
import {AnalysisService} from "./analysis/analysis.service";
import {SonarAnalysisRequest} from "./analysis/model/SonarAnalysisRequest";
import {ResultValidatorService} from "./analysis/result-validator.service";
import {ResultParserService} from "./analysis/result-parser.service";
import {tryCatch} from "rxjs/util/tryCatch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  onMessage(messageEvent: MessageEvent) {
    console.log("data",messageEvent.data);

    try{
      console.log("parse",this.resultParserService.parse(messageEvent.data));
    } catch (error) {
      console.log("parseError",error);
    }
  }

  title = 'app';

  constructor(private analysisService: AnalysisService, private resultValidatorService: ResultValidatorService, private resultParserService: ResultParserService){
    analysisService.open('ws://localhost:8080');
    analysisService.websocket().onMessage((m) => {this.onMessage(m);}, {autoApply: false});
    let req = new SonarAnalysisRequest(0,"https://sonarcloud.io", "uk.ac.diamond.workflows", false);
    analysisService.startSonarImporter(req);
  }

}
