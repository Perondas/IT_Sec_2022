import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isAdmin, isAdminNoPass } from 'src/app/helpers/typeGuard/guard.admin';
import { Admin } from 'src/app/models/admin';
import { AdminUserService } from 'src/app/services/adminUserService/admin-user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AdminPassChangeDialogComponent } from '../dialogs/admin-pass-change-dialog/admin-pass-change-dialog.component';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';
import { UpdateAdminDialogComponent } from '../dialogs/update-admin-dialog/update-admin-dialog.component';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss'],
})
export class AdminDetailsComponent {
  loggedAdmin: Admin;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private userService: AdminUserService
  ) {
    const admin = this.authService.user;
    if (admin === null) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: 'details' },
      });
      this.loggedAdmin = {
        username: '',
        password: '',
      };
    } else {
      this.loggedAdmin = admin;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: 'details' } });
  }

  private inUpdateDetails = false;
  onUpdateDetails(): void {
    if(this.inUpdateDetails){
      return;
    }
    this.inUpdateDetails = true;

    const dialogRef = this.dialog.open(UpdateAdminDialogComponent, {
      data: { admin: this.loggedAdmin },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      const admin = isAdminNoPass(result);
      if (admin) {
        admin.password = this.loggedAdmin.password;
        await this.userService
          .updateAdmin(admin)
          .then((success) => {
            if (success) {
              this.authService
                .login(admin.username, admin.password)
                .then((admin) => {
                  this.loggedAdmin = admin;
                  this.inUpdateDetails = false;
                })
                .catch(() => {
                  this.onLogout();
                  this.inUpdateDetails = false;
                  return;
                });
            } else {
              this.dialog.open(MessageBoxComponent, {
                data: { message: 'Failed to update data.' },
              });
              this.inUpdateDetails = false;
            }
          })
          .catch((reason) => {
            this.dialog.open(MessageBoxComponent, {
              data: { message: `Failed to update data. Please try again later` },
            });
            this.inUpdateDetails = false;
          });
      }
    });
  }

  private inUpdatePass = false;
  onUpdatePass(): void {
    if(this.inUpdatePass){
      return;
    }
    this.inUpdatePass = true;
    const dialogRef = this.dialog.open(AdminPassChangeDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && typeof result === 'string') {
        await this.userService
          .updatePassword(result)
          .then((success) => {
            if (success) {
              this.router.navigate(['/login'], {
                queryParams: { returnUrl: 'details' },
              });
              this.inUpdatePass = false;
            } else {
              this.dialog.open(MessageBoxComponent, {
                data: { message: 'Failed to update password.' },
              });
              this.inUpdatePass = false;
            }
          })
          .catch((reason) => {
            this.dialog.open(MessageBoxComponent, {
              data: { message: `Failed to update password. Please try again later` },
            });
            this.inUpdatePass = false;
          });
      }
    });
  }
}
