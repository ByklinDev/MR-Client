import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mrResearchGuard } from './mr-research-guard';

describe('mrResearchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mrResearchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
