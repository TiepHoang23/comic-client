import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentReadComponent } from './recent-read.component';

describe('RecentReadComponent', () => {
  let component: RecentReadComponent;
  let fixture: ComponentFixture<RecentReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentReadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
