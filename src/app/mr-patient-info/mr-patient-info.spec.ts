import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrPatientInfo } from './mr-patient-info';

describe('MrPatientInfo', () => {
  let component: MrPatientInfo;
  let fixture: ComponentFixture<MrPatientInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrPatientInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrPatientInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
