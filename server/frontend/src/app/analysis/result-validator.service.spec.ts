import { TestBed, inject } from '@angular/core/testing';

import { ResultValidatorService } from './result-validator.service';

describe('ResultValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultValidatorService]
    });
  });

  it('should be created', inject([ResultValidatorService], (service: ResultValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
