import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  constructor(private authService: AuthenticationService) {}

  public async updateAdmin(admin: Admin): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }
    admin.password = loggedUser.password;
    admin.username = loggedUser.username;
    const response = await fetch(
      `${environment.apiUrl}/users/admins/${admin.username}`,
      {
        method: 'POST',
        body: JSON.stringify(admin),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${loggedUser.authdata}`,
        },
      }
    );

    if (response.status === 500) {
      response
        .json()
        .then((message) => {
          throw new Error(message);
        })
        .catch(() => {
          throw new Error('Server did not send reason');
        });
    }

    return response.ok;
  }

  public async updatePassword(newPassword: string): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }
    if (!newPassword) {
      throw new Error('Password must be set!');
    }
    loggedUser.password = newPassword;

    const response = await fetch(
      `${environment.apiUrl}/users/admins/${loggedUser.username}`,
      {
        method: 'POST',
        body: JSON.stringify(loggedUser),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${loggedUser.authdata}`,
        },
      }
    );

    if (response.status === 500) {
      response
        .json()
        .then((message) => {
          throw new Error(message);
        })
        .catch(() => {
          throw new Error('Server did not send reason');
        });
    }

    if (response.ok) {
      this.authService.logout();
    }

    return response.ok;
  }
}
