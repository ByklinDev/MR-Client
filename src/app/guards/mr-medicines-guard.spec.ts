import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrMedicinesGuard } from './mr-medicines-guard';

describe('mrMedicinesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrMedicinesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
