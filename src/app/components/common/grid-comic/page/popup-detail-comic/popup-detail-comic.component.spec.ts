import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetailComicComponent } from './popup-detail-comic.component';

describe('PopupDetailComicComponent', () => {
  let component: PopupDetailComicComponent;
  let fixture: ComponentFixture<PopupDetailComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupDetailComicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupDetailComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
