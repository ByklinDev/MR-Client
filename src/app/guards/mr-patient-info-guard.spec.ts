import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrPatientInfoGuard } from './mr-patient-info-guard';

describe('mrPatientInfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrPatientInfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
