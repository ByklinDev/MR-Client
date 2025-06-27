import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrLogIn } from './mr-log-in';



describe('MrLogIn', () => {
  let component: MrLogIn;
  let fixture: ComponentFixture<MrLogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrLogIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrLogIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
