import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrContactUs } from './mr-contact-us';

describe('MrContactUs', () => {
  let component: MrContactUs;
  let fixture: ComponentFixture<MrContactUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrContactUs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrContactUs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
