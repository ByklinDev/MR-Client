import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrAddMedicine } from './mr-add-medicine';

describe('MrAddMedicine', () => {
  let component: MrAddMedicine;
  let fixture: ComponentFixture<MrAddMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrAddMedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrAddMedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
