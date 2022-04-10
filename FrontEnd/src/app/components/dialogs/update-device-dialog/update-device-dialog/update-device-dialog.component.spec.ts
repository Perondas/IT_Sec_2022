import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeviceDialogComponent } from './update-device-dialog.component';

describe('UpdateDeviceDialogComponent', () => {
  let component: UpdateDeviceDialogComponent;
  let fixture: ComponentFixture<UpdateDeviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeviceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
