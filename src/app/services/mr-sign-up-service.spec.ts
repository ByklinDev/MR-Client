import { TestBed } from '@angular/core/testing';

import { MrSignUpService } from './mr-sign-up-service';

describe('MrSignUpService', () => {
  let service: MrSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
