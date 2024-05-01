import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardSkeletonComponent } from './list-card-skeleton.component';

describe('ListCardSkeletonComponent', () => {
  let component: ListCardSkeletonComponent;
  let fixture: ComponentFixture<ListCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
