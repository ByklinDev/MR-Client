import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrEditMedicine } from './mr-edit-medicine';

describe('MrEditMedicine', () => {
  let component: MrEditMedicine;
  let fixture: ComponentFixture<MrEditMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrEditMedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrEditMedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
