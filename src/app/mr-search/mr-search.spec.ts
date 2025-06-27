import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrSearch } from './mr-search';

describe('MrSearch', () => {
  let component: MrSearch;
  let fixture: ComponentFixture<MrSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
