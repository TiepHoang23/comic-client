import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSelectorComponent } from './chapter-selector.component';

describe('ChapterSelectorComponent', () => {
  let component: ChapterSelectorComponent;
  let fixture: ComponentFixture<ChapterSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
