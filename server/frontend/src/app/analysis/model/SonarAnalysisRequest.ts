import {AnalysisRequest} from "./AnalysisRequest";

export class SonarAnalysisRequest extends AnalysisRequest {

  constructor(public id:number, public url: string, public projectId: string, public mergeModules:boolean) {
    super("sonar", id);
  }

}
