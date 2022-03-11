import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordMatchValidator } from 'src/app/helpers/passwordValidator';
import { Admin } from 'src/app/models/admin';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-pass-change-dialog',
  templateUrl: './admin-pass-change-dialog.component.html',
  styleUrls: ['./admin-pass-change-dialog.component.scss'],
})
export class AdminPassChangeDialogComponent {
  oldP = '';
  hide = true;
  hideOld = true;
  minPw = environment.minPw;
  updatePassForm = this.formBuilder.group(
    {
      oldPass: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
    },
    { validator: PasswordMatchValidator }
  );

  constructor(
    public dialogRef: MatDialogRef<AdminPassChangeDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    const loggedUser = this.authService.user;
    if (loggedUser) {
      this.oldP = loggedUser.password;
    }
  }

  formMember(name: string): AbstractControl {
    const member = this.updatePassForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  onSaveClick(): void {
    const logged = this.authService.user;
    if (!logged) {
      alert('Need to be logged in to change password');
      this.dialogRef.close();
    }

    const a = this.updatePassForm.value;
    if (a.oldPass !== this.oldP) {
      console.log(a.oldPass);
      console.log(this.oldP);
      this.updatePassForm.get('oldPass')?.setErrors({ match: true });
    }

    if (!this.updatePassForm.valid) {
      return;
    }
    this.dialogRef.close(a.password);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
