import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrNewPatient } from './mr-new-patient';

describe('MrNewPatient', () => {
  let component: MrNewPatient;
  let fixture: ComponentFixture<MrNewPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrNewPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrNewPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
