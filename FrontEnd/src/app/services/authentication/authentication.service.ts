import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private storageName = 'User';
  public isLoggedIn: boolean = false;

  constructor() {}
  public get user(): Admin | null {
    const user = sessionStorage.getItem(this.storageName);
    if (user) {
      return JSON.parse(user) as Admin;
    }
    return null;
  }

  public async login(username: string, password: string): Promise<Admin> {
    const response = await fetch(`${environment.apiUrl}/session/admin`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        throw new Error('Incorrect username or password');
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } else {
      const res = await response.json();
      const admin = res as Admin;
      admin.authdata = window.btoa(username + ':' + password);
      admin.password = password;
      sessionStorage.setItem(this.storageName, JSON.stringify(admin));
      this.isLoggedIn = true;
      return admin;
    }
  }

  public logout() {
    sessionStorage.removeItem(this.storageName);
    this.isLoggedIn = false;
  }

  public async register(admin: Admin): Promise<Admin> {
    const response = await fetch(`${environment.apiUrl}/users/admins`, {
      method: 'POST',
      body: JSON.stringify(admin),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status == 409) {
        throw new Error('User already exists');
      }
      if (response.status == 500) {
        throw new Error('Internal server error');
      }

      throw new Error(`Server responded with ${response.status}`);
    } else {
      const newAdmin = (await response.json()) as Admin;
      newAdmin.authdata = window.btoa(admin.username + ':' + admin.password);
      newAdmin.password = admin.password;
      sessionStorage.setItem(this.storageName, JSON.stringify(newAdmin));
      this.isLoggedIn = true;
      return newAdmin;
    }
  }

  public loggedIn() {
    return this.isLoggedIn;
  }
}
