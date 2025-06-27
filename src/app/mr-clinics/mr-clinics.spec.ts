import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrClinics } from './mr-clinics';

describe('MrClinics', () => {
  let component: MrClinics;
  let fixture: ComponentFixture<MrClinics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrClinics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrClinics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
