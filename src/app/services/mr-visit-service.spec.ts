import { TestBed } from '@angular/core/testing';

import { MrVisitService } from './mr-visit-service';

describe('MrVisitService', () => {
  let service: MrVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
