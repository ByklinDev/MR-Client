import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrRolesGuard } from './mr-roles-guard';

describe('mrRolesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrRolesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
