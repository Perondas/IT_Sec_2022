import { readFileSync } from "fs";
import r from "rethinkdb";
import bcrypt from "bcrypt";
import { Admin } from "../models/model.admin";

export async function loginAdmin(username: string, password: string) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const user = (await r
    .db(config.db.db_name)
    .table("admins")
    .get(username)
    .run(conn)) as Admin;
  if (user == null) {
    return null;
  } else {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  return null;
}

export async function checkAdmin(username: string): Promise<boolean> {
  if (!username) {
    return false;
  }

  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });
  return r
    .db(config.db.db_name)
    .table("admins")
    .getAll(username)
    .count()
    .eq(1)
    .run(conn);
}

export async function addAdministrator(admin: Admin) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  if (
    (await r
      .db(config.db.db_name)
      .table("admins")
      .get(admin.username)
      .run(conn)) != null
  ) {
    throw "User already exists!";
  }

  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(admin.password, salt);
  admin.password = hash;

  r.db(config.db.db_name)
    .table("admins")
    .insert(admin)
    .run(conn)
    .catch((reason) => {
      throw reason;
    });
}

export async function updateAdminDb(admin: Admin) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(admin.password, salt);
  admin.password = hash;

  return r
    .db(config.db.db_name)
    .table("admins")
    .get(admin.username)
    .replace(admin)
    .run(conn);
}
