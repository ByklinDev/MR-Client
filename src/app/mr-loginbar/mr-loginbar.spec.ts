import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrLoginbar } from './mr-loginbar';

describe('MrLoginbar', () => {
  let component: MrLoginbar;
  let fixture: ComponentFixture<MrLoginbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrLoginbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrLoginbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
