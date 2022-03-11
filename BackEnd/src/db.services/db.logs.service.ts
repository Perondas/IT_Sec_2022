import { readFileSync } from "fs";
import r from "rethinkdb";
import { v4 as uuidv4 } from "uuid";
import { IsLogOut } from "../helpers/guard.log.out";
import { Log } from "../models/model.log";

export async function logsCheckInUser(uuid: string): Promise<Log> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const log: Log = {
    id: uuidv4(),
    userId: uuid,
    in: new Date(Date.now()),
  };

  await r.db(config.db.db_name).table("logs").insert(log).run(conn);

  return log;
}

export async function logsCheckOutUser(logId: string): Promise<Log> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  await r
    .db(config.db.db_name)
    .table("logs")
    .get(logId)
    .update({ out: new Date(Date.now()) })
    .run(conn);

  return (await r
    .db(config.db.db_name)
    .table("logs")
    .get(logId)
    .run(conn)) as Log;
}

export async function logExists(logId: string): Promise<boolean> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("logs")
    .getAll(logId)
    .count()
    .eq(1)
    .run(conn);
}

export async function logFulfilled(logId: string): Promise<boolean> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const log = await r.db(config.db.db_name).table("logs").get(logId).run(conn);

  if (!log) {
    throw new Error("Log id is not assigned!");
  }

  const checked = IsLogOut(log);

  return !!checked;
}

export async function userHasUnfulfilled(uuid: string): Promise<boolean> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const hasNoUnfulfilled = await r
    .db(config.db.db_name)
    .table("logs")
    .filter({ userId: uuid })
    .filter(r.row("out").eq(null).default(true))
    .count()
    .eq(0)
    .run(conn);
  return !hasNoUnfulfilled;
}
