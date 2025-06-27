import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrMyAccount } from './mr-my-account';

describe('MrMyAccount', () => {
  let component: MrMyAccount;
  let fixture: ComponentFixture<MrMyAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrMyAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrMyAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
