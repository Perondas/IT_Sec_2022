import { Admin } from "../models/model.admin";

export function isAdmin(input: any): Admin | null {
  if (!input.username || !input.password) {
    return null;
  }

  if (
    !(typeof input.username === "string") ||
    !(typeof input.password === "string")
  ) {
    return null;
  }

  if (input.firstName) {
    if (!(typeof input.firstName === "string")) {
      return null;
    }
  }

  if (input.lastName) {
    if (!(typeof input.lastName === "string")) {
      return null;
    }
  }

  const checkedAdmin: Admin = {
    username: input.username,
    password: input.password,
  };

  if (input.firstName) {
    if (!(typeof input.firstName === "string")) {
      return null;
    }
    checkedAdmin.firstName = input.firstName;
  }

  if (input.lastName) {
    if (!(typeof input.lastName === "string")) {
      return null;
    }
    checkedAdmin.lastName = input.lastName;
  }

  if (input.email) {
    if (!(typeof input.email === "string")) {
      return null;
    }
    checkedAdmin.email = input.email;
  }

  if (input.imageLink) {
    if (!(typeof input.imageLink === "string")) {
      return null;
    }
    checkedAdmin.imageLink = input.imageLink;
  }
  return checkedAdmin;
}
