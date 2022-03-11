import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  returnUrl = '';

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onRegister(): void {
    if (this.returnUrl == '/') {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/register'], {
        queryParams: { returnUrl: this.returnUrl },
      });
    }
  }

  formMember(name: string): AbstractControl {
    const member = this.loginForm.get(name);
    if (!member) {
      throw new Error(`Could not find member ${name}`);
    }
    return member;
  }

  private inSubmit = false;
  onSubmit(): void {
    if(this.inSubmit){
      return;
    }
    this.inSubmit = true;
    let user = this.loginForm.value;
    if (
      !user.username ||
      !user.password ||
      user.username == null ||
      user.password == null
    ) {
      this.inSubmit = false;
      return;
    }
    this.authService
      .login(user.username, user.password)
      .then((response) => {
        if (this.returnUrl != '') {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.router.navigateByUrl('dash');
        }
        // Success
        this.inSubmit = false;
      })
      .catch((error: Error) => {
        if (error.message === 'Incorrect username or password') {
          this.formMember('username').setErrors({ incorrect: true });
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
