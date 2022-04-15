import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device';

@Component({
  templateUrl: './update-device-dialog.component.html',
  styleUrls: ['./update-device-dialog.component.scss']
})
export class UpdateDeviceDialogComponent {

  updateDeviceForm = this.formBuilder.group({
    name: [this.data.device.name, Validators.required],
    type: [this.data.device.type, Validators.required],
    manufacturer: [this.data.device.manufacturer, Validators.required],
    place: [this.data.device.place, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateDeviceDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { device: Device }
  ) {}

  formMember(name: string): AbstractControl {
    const member = this.updateDeviceForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  onSaveClick(): void {
    const d = this.updateDeviceForm.value;
    const device: Device = {
      name: d.name,
      type: d.type,
      manufacturer: d.manufacturer,
      place: d.place,
      isOn: d.isOn
    };

    this.dialogRef.close(device);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
