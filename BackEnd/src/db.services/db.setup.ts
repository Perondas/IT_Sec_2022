import { readFileSync } from "fs";
import r from "rethinkdb";

export async function setUpDb() {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const dbList = await r.dbList().run(conn);

  if (!dbList.includes(config.db.db_name)) {
    await r.dbCreate(config.db.db_name).run(conn);
    console.log("Created New Db!");
  }

  const db = r.db("covid-db");
  const tableList = await db.tableList().run(conn);

  if (!tableList.includes("admins")) {
    await db
      .tableCreate("admins", {
        primary_key: "username",
      })
      .run(conn);
    console.log("Created table admins");
  }

  if (!tableList.includes("users")) {
    await db
      .tableCreate("users", {
        primary_key: "uuid",
      })
      .run(conn);
    console.log("Created table users");
  }

  if (!tableList.includes("logs")) {
    await db
      .tableCreate("logs", {
        primary_key: "id",
      })
      .run(conn);
    console.log("Created table logs");
  }
}
