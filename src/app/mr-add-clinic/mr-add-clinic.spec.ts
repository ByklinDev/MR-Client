import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrAddClinic } from './mr-add-clinic';

describe('MrAddClinic', () => {
  let component: MrAddClinic;
  let fixture: ComponentFixture<MrAddClinic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrAddClinic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrAddClinic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
