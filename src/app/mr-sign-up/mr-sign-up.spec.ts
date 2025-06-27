import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrSignUp } from './mr-sign-up';

describe('MrSignUp', () => {
  let component: MrSignUp;
  let fixture: ComponentFixture<MrSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrSignUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrSignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
