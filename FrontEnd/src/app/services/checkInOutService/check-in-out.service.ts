import { Injectable } from '@angular/core';
import { Log } from 'src/app/models/log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutService {
  constructor() {}

  public async CheckIn(uuid: string): Promise<Log> {
    const response = await fetch(`${environment.apiUrl}/logs/in/${uuid}`, {
      method: 'POST',
      mode: 'cors',
    });

    if (response.ok) {
      const log = (await response.json()) as Log;
      return log;
    }

    if (response.status === 500) {
      response
        .json()
        .then((message) => {
          throw new Error(message);
        })
        .catch(() => {
          throw new Error('A server error occurredd. Please try again later!');
        });
    }

    if (response.status === 404) {
      throw new Error(`Could not find user!`);
    }

    if (response.status === 403) {
      throw new Error(`Cannot check in multiple times!`);
    }

    throw new Error(`Server responded with code: ${response.status}`);
  }

  public async CheckOut(logId: string): Promise<Log> {
    const response = await fetch(`${environment.apiUrl}/logs/out/${logId}`, {
      method: 'POST',
      mode: 'cors',
    });

    if (response.ok) {
      const log = (await response.json()) as Log;
      return log;
    }

    if (response.status === 500) {
      console.log('500');
      response
        .json()
        .then((message) => {
          throw new Error(message);
        })
        .catch(() => {
          throw new Error('Server did not send reason');
        });
    }

    if (response.status === 404) {
      throw new Error(`Could not find check-in Id!`);
    }

    if (response.status === 403) {
      throw new Error(`Cannot check out multiple times!`);
    }

    throw new Error(`Server responded with code: ${response.status}`);
  }
}
