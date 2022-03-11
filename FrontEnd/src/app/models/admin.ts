export class Admin {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageLink?: string;
  authdata?: string;
}
