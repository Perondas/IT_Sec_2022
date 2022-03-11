import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { isUserNoUUID } from 'src/app/helpers/typeGuard/guard.user';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: 'create-user-dialog.component.html',
  styleUrls: ['create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent {
  newUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    country: ['', Validators.required],
    stateOrProvince: [''],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    buildingNum: ['', Validators.required],
  });
  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private formBuilder: FormBuilder
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
    const checked = isUserNoUUID(user);
    if (!checked) {
      return;
    }

    this.dialogRef.close(checked);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
