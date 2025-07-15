import { TestBed } from '@angular/core/testing';

import { MrMedicineService } from './mr-medicine-service';

describe('MrMedicineService', () => {
  let service: MrMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
