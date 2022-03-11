import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { PasswordMatchValidator } from '../../helpers/passwordValidator';
import { Admin } from '../../models/admin';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  hide = true;
  returnUrl = '';
  minPw = environment.minPw;

  registrationForm = this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
      firstName: '',
      lastName: '',
      email: ['', Validators.email],
      imageLink: ['', Validators.pattern('(https?://.*.(?:png|jpg))')],
    },
    { validator: PasswordMatchValidator }
  );

  formMember(name: string): AbstractControl {
    const member = this.registrationForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onLogin(): void {
    if (this.returnUrl == '/') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.returnUrl },
      });
    }
  }

  private inSubmit = false;
  onSubmit(): void {
    if(this.inSubmit){
      return;
    }
    this.inSubmit = true;
    let user = this.registrationForm.value;
    if (
      !user.username ||
      !user.password ||
      !user.password2 ||
      user.username == null ||
      user.password == null ||
      user.password2 == null
    ) {
      this.inSubmit = false;
      return;
    }
    this.authService
      .register(user as Admin)
      .then((response) => {
        if (this.returnUrl != '') {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.router.navigateByUrl('dash');
        }
        this.inSubmit = false;
      })
      .catch((error: Error) => {
        if (error.message == 'User already exists') {
          this.formMember('username').setErrors({ taken: true });
        } else {
          this.dialog.open(MessageBoxComponent, {
            data: { message: 'A error occurred. Please try again later!' },
          });
        }
        this.inSubmit = false;
      });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
