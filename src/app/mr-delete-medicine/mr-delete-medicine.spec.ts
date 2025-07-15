import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrDeleteMedicine } from './mr-delete-medicine';

describe('MrDeleteMedicine', () => {
  let component: MrDeleteMedicine;
  let fixture: ComponentFixture<MrDeleteMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrDeleteMedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrDeleteMedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
