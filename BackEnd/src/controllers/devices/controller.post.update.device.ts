import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import {
  updateDeviceDb,
  deviceExists,
} from "../../db.services/db.deviceService";
import { authorizeAdmin } from "../../auth/auth.admin";
import { isDevice } from "../../helpers/guard.device";
import { log } from "../../db.services/db.logging.service";

export async function registerUpdateDevices(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/devices/:name", jsonParser, updateDevice);
}

async function updateDevice(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    log("Failed to update device. Unauthorized!", req.ip);
    res.status(401).send();
    return;
  }

  if (!req.params["name"]) {
    log("Failed to update device. Bad request!", req.ip);
    res.status(400).send();
    return;
  }
  const name = req.params["name"];
  const device = req.body;

  const checkedDevice = isDevice(device);

  if (checkedDevice === null || checkedDevice.name !== name) {
    log("Failed to update device. Bad request!", req.ip);
    res.status(400).send();
  }

  if (!(await deviceExists(name))) {
    log("Failed to update device. Device not found!", req.ip);
    res.status(404).send();
    return;
  }

  updateDeviceDb(device)
    .then(() => {
      log(`Updated device: ${device.name}.`, req.ip);
      res.status(200).send();
    })
    .catch((reason) => {
      log("Failed to update device. Internal server error!", req.ip);
      res.status(500).json(reason);
    });
}
