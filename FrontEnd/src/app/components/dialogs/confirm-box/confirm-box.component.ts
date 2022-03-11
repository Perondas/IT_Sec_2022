import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss'],
})
export class ConfirmBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNo() {
    this.dialogRef.close(false);
  }

  onYes() {
    this.dialogRef.close(true);
  }
}
