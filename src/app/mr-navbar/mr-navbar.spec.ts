import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrNavbar } from './mr-navbar';

describe('MrNavbar', () => {
  let component: MrNavbar;
  let fixture: ComponentFixture<MrNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
