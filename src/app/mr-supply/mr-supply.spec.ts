import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrSupply } from './mr-supply';

describe('MrSupply', () => {
  let component: MrSupply;
  let fixture: ComponentFixture<MrSupply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrSupply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrSupply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
