import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQrCodeDialogComponent } from './show-qr-code-dialog.component';

describe('ShowQrCodeDialogComponent', () => {
  let component: ShowQrCodeDialogComponent;
  let fixture: ComponentFixture<ShowQrCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowQrCodeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQrCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
