import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrMedicines } from './mr-medicines';

describe('MrMedicines', () => {
  let component: MrMedicines;
  let fixture: ComponentFixture<MrMedicines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrMedicines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrMedicines);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
