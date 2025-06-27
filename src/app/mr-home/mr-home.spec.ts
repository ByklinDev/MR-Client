import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrHome } from './mr-home';

describe('MrHome', () => {
  let component: MrHome;
  let fixture: ComponentFixture<MrHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
