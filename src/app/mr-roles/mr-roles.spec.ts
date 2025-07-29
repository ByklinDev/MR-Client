import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrRoles } from './mr-roles';

describe('MrRoles', () => {
  let component: MrRoles;
  let fixture: ComponentFixture<MrRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
