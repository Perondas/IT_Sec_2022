import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isAdminNoPass } from 'src/app/helpers/typeGuard/guard.admin';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-update-admin-dialog',
  templateUrl: './update-admin-dialog.component.html',
  styleUrls: ['./update-admin-dialog.component.scss'],
})
export class UpdateAdminDialogComponent {
  updateAdminForm = this.formBuilder.group({
    firstName: this.data.admin.firstName,
    lastName: this.data.admin.lastName,
    email: [this.data.admin.email, Validators.email],
    imageLink: [
      this.data.admin.imageLink,
      Validators.pattern('(https?://.*.(?:png|jpg))'),
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateAdminDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { admin: Admin }
  ) {}

  formMember(name: string): AbstractControl {
    const member = this.updateAdminForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  onSaveClick(): void {
    if (!this.updateAdminForm.valid) {
      return;
    }
    const a = this.updateAdminForm.value;
    const admin: Admin = {
      username: this.data.admin.username,
      password: this.data.admin.password,
      firstName: a.firstName,
      lastName: a.lastName,
      email: a.email,
      imageLink: a.imageLink,
    };

    const checked = isAdminNoPass(admin);
    if (!checked) {
      console.log('failed check!');
      return;
    }

    this.dialogRef.close(checked);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
