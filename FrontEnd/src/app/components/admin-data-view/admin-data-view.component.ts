import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { isUser, isUserNoUUID } from 'src/app/helpers/typeGuard/guard.user';
import { FlatUser, toFlat } from 'src/app/models/flatUser';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/userService/user.service';
import { fromFlat, User } from '../../models/user';
import { AboutDialogComponent } from '../dialogs/about-dialog/about-dialog.component';
import { ConfirmBoxComponent } from '../dialogs/confirm-box/confirm-box.component';
import { CreateUserDialogComponent } from '../dialogs/create-user-dialog/create-user-dialog.component';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';
import { ShowQrCodeDialogComponent } from '../dialogs/show-qr-code-dialog/show-qr-code-dialog.component';
import { UpdateUserDialogComponent } from '../dialogs/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-admin-data-view',
  templateUrl: './admin-data-view.component.html',
  styleUrls: ['./admin-data-view.component.scss'],
})
export class AdminDataViewComponent implements OnInit {
  columnsToDisplay = [
    'uuid',
    'name',
    'country',
    'stateOrProvince',
    'postalCode',
    'city',
    'street',
    'buildingNumber',
    'actions',
  ];

  users: FlatUser[] = [];
  rowData = new MatTableDataSource(this.users);
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    if (this.authService.user == null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: 'data' } });
    } else {
      this.userService
        .getUsers()
        .then((users) => {
          this.rowData = new MatTableDataSource(
            users.map((user) => toFlat(user))
          );
          this.rowData.sort = this.sort;
        })
        .catch((error) => {
          this.dialog.open(MessageBoxComponent, {
            data: { message: `An error occurred while loading the data` },
          });
        });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: 'data' } });
  }

  private inNewUser = false;
  onNewUser(): void {
    if(this.inNewUser){
      return;
    }
    this.inNewUser = true;
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        this.inNewUser = false;
        return;
      }
      const user = isUserNoUUID(result);
      if (user) {
        this.userService.addUser(user).then((user) =>{
          this.userService
          .getUsers()
          .then((users) => {
            this.rowData.data = users.map((user) => toFlat(user));
            this.rowData.sort = this.sort;
            this.inNewUser = false;
          })
          .catch((error) => {
            this.dialog.open(MessageBoxComponent, {
              data: { message: `An error occurred while loading the data` },
            });
            this.inNewUser = false;
          });
        }).catch((error) => {
          this.dialog.open(MessageBoxComponent, {
            data: { message: `An error occurred while adding the user` },
          });
          this.inNewUser = false;
        });
      }
      else{
        this.dialog.open(MessageBoxComponent, {
          data: { message: `User was incorrectly formatted` },
        });
        this.inNewUser = false;
      } 
    });
  }

  onShowQr(uuid: string): void {
    const dialogRef = this.dialog.open(ShowQrCodeDialogComponent, {
      data: { uuid: uuid },
    });
  }

  private inDeleteUser = false;
  onDeleteUser(uuid: string): void {
    if(this.inDeleteUser){
      return;
    }
    this.inDeleteUser = true;
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      data: {
        message: `Are you sure you want to delete the user with uuid: ${uuid}`,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.userService
          .deleteUser(uuid)
          .then((success) => {
            if (success) {
              this.dialog.open(MessageBoxComponent, {
                data: { message: 'Successfully deleted' },
              });
              this.userService
                .getUsers()
                .then((users) => {
                  this.rowData.data = users.map((user) => toFlat(user));
                  this.rowData.sort = this.sort;
                  this.inDeleteUser = false;
                })
                .catch((error) => {
                  this.dialog.open(MessageBoxComponent, {
                    data: { message: 'Failed to load data' },
                  });
                  this.inDeleteUser = false;
                });
            } else {
              this.dialog.open(MessageBoxComponent, {
                data: { message: 'Failed to delete entry' },
              });
              this.inDeleteUser = false;
            }
          })
          .catch((reason) => {
            this.dialog.open(MessageBoxComponent, {
              data: { message: `An error occurred: ${reason}` },
            });
            this.inDeleteUser = false;
          });
      }
      this.inDeleteUser = false;
    });
  }

  private inUpdateUser = false;
  onUpdateUser(user: FlatUser): void {
    if(this.inUpdateUser){
      return;
    }
    this.inUpdateUser = true;
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: { user: fromFlat(user) },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result);
      const user = isUser(result);
      if (user) {
        this.userService
          .updateUserDb(user)
          .then(() => {
            this.userService
              .getUsers()
              .then((users) => {
                this.rowData.data = users.map((user) => toFlat(user));
                this.rowData.sort = this.sort;
                this.inUpdateUser = false;
              })
              .catch((error) => {
                this.dialog.open(MessageBoxComponent, {
                  data: { message: 'Failed to load data' },
                });
                this.inUpdateUser = false;
              });
          })
          .catch((reason) => {
            this.dialog.open(MessageBoxComponent, {
              data: { message: `Failed to update user.` },
            });
            this.inUpdateUser = false;
          });
      }
      this.inUpdateUser = false;
    });
  }

  onAbout() {
    this.dialog.open(AboutDialogComponent);
  }
}
