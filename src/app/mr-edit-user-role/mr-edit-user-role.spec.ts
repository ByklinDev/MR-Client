import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrEditUserRole } from './mr-edit-user-role';

describe('MrEditUserRole', () => {
  let component: MrEditUserRole;
  let fixture: ComponentFixture<MrEditUserRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrEditUserRole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrEditUserRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
