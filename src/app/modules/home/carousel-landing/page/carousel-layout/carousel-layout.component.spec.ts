import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLayoutComponent } from './carousel-layout.component';

describe('CarouselLayoutComponent', () => {
  let component: CarouselLayoutComponent;
  let fixture: ComponentFixture<CarouselLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
