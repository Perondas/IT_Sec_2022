import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPassChangeDialogComponent } from './admin-pass-change-dialog.component';

describe('AdminPassChangeDialogComponent', () => {
  let component: AdminPassChangeDialogComponent;
  let fixture: ComponentFixture<AdminPassChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPassChangeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPassChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
