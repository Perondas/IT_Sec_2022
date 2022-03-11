import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminDialogComponent } from './update-admin-dialog.component';

describe('UpdateAdminDialogComponent', () => {
  let component: UpdateAdminDialogComponent;
  let fixture: ComponentFixture<UpdateAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAdminDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
