import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDownloadComponent } from './admin-download.component';

describe('AdmicNewComicComponet', () => {
  let component: AdminDownloadComponent;
  let fixture: ComponentFixture<AdminDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDownloadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
