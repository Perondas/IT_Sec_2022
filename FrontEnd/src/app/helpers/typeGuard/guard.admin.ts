import { Admin } from '../../models/admin';

export function isAdminNoPass(input: any): Admin | null {
  if (!input.username) {
    return null;
  }

  if (!(typeof input.username === 'string')) {
    return null;
  }

  if (input.firstName) {
    if (!(typeof input.firstName === 'string')) {
      return null;
    }
  }

  if (input.lastName) {
    if (!(typeof input.lastName === 'string')) {
      return null;
    }
  }

  const checkedAdmin: Admin = {
    username: input.username,
    password: input.password,
  };

  if (input.firstName) {
    if (!(typeof input.firstName === 'string')) {
      return null;
    }
    checkedAdmin.firstName = input.firstName;
  }

  if (input.lastName) {
    if (!(typeof input.lastName === 'string')) {
      return null;
    }
    checkedAdmin.lastName = input.lastName;
  }

  if (input.email) {
    if (!(typeof input.email === 'string')) {
      return null;
    }
    checkedAdmin.email = input.email;
  }

  if (input.imageLink) {
    if (!(typeof input.imageLink === 'string')) {
      return null;
    }
    checkedAdmin.imageLink = input.imageLink;
  }
  return checkedAdmin;
}

export function isAdmin(input: any): Admin | null {
  const result = isAdminNoPass(input);
  if (!result) {
    return null;
  } else {
    if (result.password && typeof result.password === 'string') {
      return result;
    } else {
      return null;
    }
  }
}
