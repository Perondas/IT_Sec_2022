import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
})
export class AboutDialogComponent {
  version: string = environment.version;
  name: string = environment.name;
  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) {}

  onClose() {
    this.dialogRef.close();
  }
}
