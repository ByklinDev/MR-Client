import { TestBed } from '@angular/core/testing';

import { MrEmailService } from './mr-email-service';

describe('MrEmailService', () => {
  let service: MrEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
