import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicCardV2Component } from './comic-card-v2.component';

describe('ComicCardV2Component', () => {
  let component: ComicCardV2Component;
  let fixture: ComponentFixture<ComicCardV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicCardV2Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComicCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
