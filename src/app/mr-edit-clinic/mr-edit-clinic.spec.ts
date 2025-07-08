import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrEditClinic } from './mr-edit-clinic';

describe('MrEditClinic', () => {
  let component: MrEditClinic;
  let fixture: ComponentFixture<MrEditClinic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrEditClinic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrEditClinic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
