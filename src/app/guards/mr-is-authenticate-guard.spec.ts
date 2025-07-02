import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrIsAuthenticateGuard } from './mr-is-authenticate-guard';

describe('mrIsAuthenticateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrIsAuthenticateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
