import { TestBed } from '@angular/core/testing';

import { MrClinicService } from './mr-clinic-service';

describe('MrClinicService', () => {
  let service: MrClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
