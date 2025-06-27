import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrResearch } from './mr-research';

describe('MrResearch', () => {
  let component: MrResearch;
  let fixture: ComponentFixture<MrResearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrResearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrResearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
