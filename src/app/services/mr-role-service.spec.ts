import { TestBed } from '@angular/core/testing';

import { MrRoleService } from './mr-role-service';

describe('MrRoleService', () => {
  let service: MrRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
