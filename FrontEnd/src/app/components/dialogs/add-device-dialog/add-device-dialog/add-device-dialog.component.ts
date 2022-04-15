import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Device } from 'src/app/models/device';

@Component({
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.scss']
})
export class AddDeviceDialogComponent {
  newDeviceForm = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    manufacturer: ['', Validators.required],
    place: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AddDeviceDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  formMember(name: string): AbstractControl {
    const member = this.newDeviceForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  onSaveClick(): void {
    const d = this.newDeviceForm.value;
    const device: Device = {
      name: d.name,
      type: d.type,
      manufacturer: d.manufacturer,
      place: d.place,
      isOn: false
    };

    this.dialogRef.close(device);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
