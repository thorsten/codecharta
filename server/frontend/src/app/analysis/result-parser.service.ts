import { Injectable } from '@angular/core';
import {AnalysisResult} from "./model/AnalysisResult";
import {AnalysisError} from "./model/AnalysisError";
import {ResultValidatorService} from "./result-validator.service";

@Injectable()
export class ResultParserService {

  constructor(private resultValidatorService:ResultValidatorService) { }

  parse(messageData: any):AnalysisResult {

    let result = JSON.parse(messageData);
    if(this.resultValidatorService.validate(result)){
      return result;
    } else {
      throw new AnalysisError(result.stderr);
    }




  }

}
