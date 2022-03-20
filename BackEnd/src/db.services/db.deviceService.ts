import { readFileSync } from "fs";
import r from "rethinkdb";
import { isDevice } from "../helpers/guard.device";
import { Device } from "../models/model.device";

export async function addDeviceDb(device: Device) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  r.db(config.db.db_name)
    .table("devices")
    .insert(device)
    .run(conn)
    .catch((reason) => {
      throw reason;
    });
}

export async function getAllDevices(): Promise<any[]> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("devices")
    .run(conn)
    .then(async (cursor) => {
      return cursor.toArray();
    });
}

export async function deviceExists(name: string): Promise<boolean> {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("devices")
    .getAll(name)
    .count()
    .eq(1)
    .run(conn);
}

export async function deleteDeviceDb(name: string) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r.db(config.db.db_name).table("devices").get(name).delete().run(conn);
}

export async function updateDeviceDb(device: Device) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  return r
    .db(config.db.db_name)
    .table("devices")
    .get(device.name)
    .replace(device)
    .run(conn);
}

export async function toggleDeviceDb(name: string) {
  const settings = readFileSync("config.json");
  const config = JSON.parse(settings.toString());

  const conn = await r.connect({
    host: config.db.hostname,
    port: config.db.port,
  });

  const obj = await r
    .db(config.db.db_name)
    .table("devices")
    .get(name)
    .run(conn);
  if (!obj) {
    throw new Error("Device not found");
  } else {
    const device = isDevice(obj);
    if (device) {
      device.isOn = !device.isOn;
      return r
        .db(config.db.db_name)
        .table("devices")
        .get(device.name)
        .replace(device)
        .run(conn);
    }
  }
}
