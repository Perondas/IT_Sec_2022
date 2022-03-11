import { readFileSync } from "fs";
import r from "rethinkdb";
import { User } from "../models/model.user";
import { v4 as uuidv4 } from "uuid";

export async function addUserDb(user: User) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const uuid = uuidv4();
  user.uuid = uuid;

  r.db(config.db.db_name)
    .table("users")
    .insert(user)
    .run(conn)
    .catch((reason) => {
      throw reason;
    });
}

export async function getAllUsers(): Promise<any[]> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("users")
    .run(conn)
    .then(async (cursor) => {
      return cursor.toArray();
    });
}

export async function userExists(uuid: string): Promise<boolean> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("users")
    .getAll(uuid)
    .count()
    .eq(1)
    .run(conn);
}

export async function deleteUserDb(uuid: string) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r.db(config.db.db_name).table("users").get(uuid).delete().run(conn);
}

export async function updateUserDb(user: User) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("users")
    .get(user.uuid)
    .replace(user)
    .run(conn);
}
