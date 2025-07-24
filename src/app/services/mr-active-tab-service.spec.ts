import { TestBed } from '@angular/core/testing';

import { MrActiveTabService } from './mr-active-tab-service';

describe('MrActiveTabService', () => {
  let service: MrActiveTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrActiveTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
