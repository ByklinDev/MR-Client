import { TestBed } from '@angular/core/testing';

import { MrAuthService } from './mr-auth-service';

describe('MrAuthService', () => {
  let service: MrAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
