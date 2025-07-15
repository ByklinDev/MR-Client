import { TestBed } from '@angular/core/testing';

import { MrMedicineContainerService } from './mr-medicine-container-service';

describe('MrMedicineContainerService', () => {
  let service: MrMedicineContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrMedicineContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
