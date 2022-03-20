import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import {
  deleteDeviceDb,
  deviceExists,
} from "../../db.services/db.deviceService";
import { authorizeAdmin } from "../../auth/auth.admin";
import { log } from "../../db.services/db.logging.service";

export async function registerDeleteDevices(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.delete("/devices/:name", jsonParser, deleteDevice);
}

async function deleteDevice(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    log("Failed to delete device. Unauthorized!", req.ip);
    res.status(401).send();
    return;
  }

  if (!req.params["name"]) {
    log("Failed to delete device. Bad request!", req.ip);
    res.status(400).send();
    return;
  }
  const name = req.params["name"];

  if (!(await deviceExists(name))) {
    log("Failed to delete device. Device does not exist!", req.ip);
    res.status(404).send();
    return;
  }

  deleteDeviceDb(name)
    .then(() => {
      log(`Deleted device: ${name}.`, req.ip);
      res.status(204).send();
    })
    .catch((reason) => {
      log("Failed to delete device. Internal server error!", req.ip);
      res.status(500).json(reason);
    });
}
