import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrFooter } from './mr-footer';

describe('MrFooter', () => {
  let component: MrFooter;
  let fixture: ComponentFixture<MrFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
