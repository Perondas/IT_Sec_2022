import { Request } from "express";
import { loginAdmin } from "../db.services/db.admin.userService";

export async function authorizeAdmin(req: Request) {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return false;
  }

  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const admin = await loginAdmin(username, password);
  return admin != null;
}
