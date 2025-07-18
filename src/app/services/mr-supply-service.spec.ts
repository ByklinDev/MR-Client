import { TestBed } from '@angular/core/testing';

import { MrSupplyService } from './mr-supply-service';

describe('MrSupplyService', () => {
  let service: MrSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
