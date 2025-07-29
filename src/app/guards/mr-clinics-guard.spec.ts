import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrClinicsGuard } from './mr-clinics-guard';

describe('mrClinicsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrClinicsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
