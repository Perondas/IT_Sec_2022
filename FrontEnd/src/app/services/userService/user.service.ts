import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthenticationService) {}

  public async getUsers(): Promise<User[]> {
    const user = this.authService.user;
    if (!user) {
      throw new Error('Not logged in!');
    }

    const response = await fetch(`${environment.apiUrl}/users/users`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${user.authdata}`,
      },
    });
    if (!response.ok) {
      if (response.status == 401) {
        this.authService.logout();
      }
      throw new Error(`Server responded with ${response.status}`);
    } else {
      const res = await response.json();
      const users = res as User[];
      return users;
    }
  }

  public async addUser(user: User): Promise<User> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }
    const response = await fetch(`${environment.apiUrl}/users/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${loggedUser.authdata}`,
      },
    });
    if (!response.ok) {
      if (response.status == 401) {
        this.authService.logout();
      }
      throw new Error(`Server responded with ${response.status}`);
    } else {
      const res = await response.json();
      const user = res as User;
      return user;
    }
  }

  public async deleteUser(uuid: string): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }
    const response = await fetch(`${environment.apiUrl}/users/users/${uuid}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${loggedUser.authdata}`,
      },
    });
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

  public async updateUserDb(user: User): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }
    const response = await fetch(
      `${environment.apiUrl}/users/users/${user.uuid}`,
      {
        method: 'POST',
        body: JSON.stringify(user),
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
}
