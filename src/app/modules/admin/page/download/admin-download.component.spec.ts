import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewComicComponent } from './admin-download.component';

describe('AdmicNewComicComponet', () => {
  let component: AdminNewComicComponent;
  let fixture: ComponentFixture<AdminNewComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewComicComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminNewComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
