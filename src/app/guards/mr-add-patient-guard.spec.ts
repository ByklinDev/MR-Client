import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrAddPatientGuard } from './mr-add-patient-guard';

describe('mrAddPatientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => mrAddPatientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
