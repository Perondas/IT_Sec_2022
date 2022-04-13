import { Injectable } from '@angular/core';
import { Log } from 'src/app/models/log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public async getLogs(): Promise<Log[]> {
    const response = await fetch(`${environment.apiUrl}/logs`, {
      method: 'GET',
      mode: 'cors',
      headers: {},
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    } else {
      const res = await response.json();
      const devices = res as Log[];
      return devices;
    }
  }
}
