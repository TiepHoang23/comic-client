import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComicDetailComponent } from './admin-comic-detail.component';

describe('AdminComicDetailComponent', () => {
  let component: AdminComicDetailComponent;
  let fixture: ComponentFixture<AdminComicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComicDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminComicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
