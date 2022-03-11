import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isUser } from 'src/app/helpers/typeGuard/guard.user';
import { User } from 'src/app/models/user';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent {
  newUserForm = this.formBuilder.group({
    name: [this.data.user.name, Validators.required],
    country: [this.data.user.address.country, Validators.required],
    stateOrProvince: [this.data.user.address.stateOrProvince],
    postalCode: [this.data.user.address.postalCode, Validators.required],
    city: [this.data.user.address.city, Validators.required],
    street: [this.data.user.address.street, Validators.required],
    buildingNum: [this.data.user.address.buildingNumber, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  formMember(name: string): AbstractControl {
    const member = this.newUserForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  onSaveClick(): void {
    const u = this.newUserForm.value;
    const user: User = {
      uuid: '',
      name: u.name,
      address: {
        country: u.country,
        stateOrProvince: u.stateOrProvince,
        postalCode: u.postalCode,
        city: u.city,
        street: u.street,
        buildingNumber: u.buildingNum,
      },
    };
    user.uuid = this.data.user.uuid;
    const checked = isUser(user);
    if (!checked) {
      return;
    }

    this.dialogRef.close(checked);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
