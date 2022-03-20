import { readFileSync } from "fs";
import r from "rethinkdb";
import { Log } from "../models/model.log";

export async function log(text: string, ip: string) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const log: Log = {
    time: new Date(),
    text: text,
    ip: ip
  };

  r.db(config.db.db_name)
    .table("logs")
    .insert(log)
    .run(conn)
    .catch((reason) => {
      throw reason;
    });
}

export async function getAllLogs() {
    const settings = readFileSync("config.json");
    const config = JSON.parse(settings.toString());
  
    const conn = await r.connect({
      host: config.db.hostname,
      port: config.db.port,
    });
  
    return r
      .db(config.db.db_name)
      .table("logs")
      .run(conn)
      .then(async (cursor) => {
        return cursor.toArray();
      });  
}
