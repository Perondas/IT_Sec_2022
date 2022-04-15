import { Injectable } from '@angular/core';
import { Device } from 'src/app/models/device';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private authService: AuthenticationService) {}

  public async getDevices(): Promise<Device[]> {
    const response = await fetch(`${environment.apiUrl}/devices`, {
      method: 'GET',
      mode: 'cors',
      headers: {},
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    } else {
      const res = await response.json();
      const devices = res as Device[];
      return devices;
    }
  }

  public async addDevice(device: Device): Promise<Device> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }

    const response = await fetch(`${environment.apiUrl}/devices`, {
      method: 'POST',
      body: JSON.stringify(device),
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
      const device = res as Device;
      return device;
    }
  }

  public async deleteDevice(deviceName: string): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }

    const response = await fetch(
      `${environment.apiUrl}/devices/${deviceName}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
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

  public async updateDevice(device: Device): Promise<boolean> {
    const loggedUser = this.authService.user;
    if (!loggedUser) {
      throw new Error('Not logged in!');
    }

    const response = await fetch(
      `${environment.apiUrl}/devices/${device.name}`,
      {
        method: 'POST',
        body: JSON.stringify(device),
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

  public async toggleDevice(device: Device): Promise<boolean> {
    const response = await fetch(
      `${environment.apiUrl}/devices/${device.name}/toggle`,
      {
        method: 'POST',
        body: JSON.stringify(device),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.status !== 204) {
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
