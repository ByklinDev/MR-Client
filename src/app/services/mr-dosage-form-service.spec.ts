import { TestBed } from '@angular/core/testing';

import { MrDosageFormService } from './mr-dosage-form-service';

describe('MrDosageFormService', () => {
  let service: MrDosageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrDosageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
