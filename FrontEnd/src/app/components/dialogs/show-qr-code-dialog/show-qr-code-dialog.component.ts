import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-show-qr-code-dialog',
  templateUrl: './show-qr-code-dialog.component.html',
  styleUrls: ['./show-qr-code-dialog.component.scss'],
})
export class ShowQrCodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowQrCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string }
  ) {}
}
