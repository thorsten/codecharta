import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisService } from './analysis.service';
import { ResultValidatorService } from './result-validator.service';
import { ResultParserService } from './result-parser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AnalysisService, ResultValidatorService, ResultParserService]
})
export class AnalysisModule { }
