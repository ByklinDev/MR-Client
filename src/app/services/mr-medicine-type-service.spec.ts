import { TestBed } from '@angular/core/testing';

import { MrMedicineTypeService } from './mr-medicine-type-service';

describe('MrMedicineTypeService', () => {
  let service: MrMedicineTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrMedicineTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
