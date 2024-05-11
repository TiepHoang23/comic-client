import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCatagoriesComponent } from './genre-catagories.component';

describe('GenreCatagoriesComponent', () => {
  let component: GenreCatagoriesComponent;
  let fixture: ComponentFixture<GenreCatagoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreCatagoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
