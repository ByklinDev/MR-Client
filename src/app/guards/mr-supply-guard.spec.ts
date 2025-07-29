import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrSupplyGuard } from './mr-supply-guard';

describe('mrSupplyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrSupplyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
