import { TestBed, inject } from '@angular/core/testing';

import { ResultParserService } from './result-parser.service';

describe('ResultParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultParserService]
    });
  });

  it('should be created', inject([ResultParserService], (service: ResultParserService) => {
    expect(service).toBeTruthy();
  }));
});
