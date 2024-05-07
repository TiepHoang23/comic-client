import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComicComponent } from './grid-comic.component';

describe('GridComicComponent', () => {
  let component: GridComicComponent;
  let fixture: ComponentFixture<GridComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
