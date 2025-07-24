import { TestBed } from '@angular/core/testing';

import { MrPatientService } from './mr-patient-service';

describe('MrPatientService', () => {
  let service: MrPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
