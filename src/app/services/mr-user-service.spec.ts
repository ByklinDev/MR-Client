import { TestBed } from '@angular/core/testing';

import { MrUserService } from './mr-user-service';

describe('MrUserService', () => {
  let service: MrUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
