import { Injectable } from '@angular/core';
import {AnalysisResult} from "./model/AnalysisResult";

@Injectable()
export class ResultValidatorService {

  constructor() { }

  validate(result: AnalysisResult) {

    return !(result.error || result.stderr);

  }

}
