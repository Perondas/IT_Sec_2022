import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { Device } from "../../models/model.device";
import { addDeviceDb, deviceExists } from "../../db.services/db.deviceService";
import { authorizeAdmin } from "../../auth/auth.admin";
import { isDevice } from "../../helpers/guard.device";
import { log } from "../../db.services/db.logging.service";

export async function registerAddDevice(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/devices", jsonParser, addDevice);
}

async function addDevice(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    log("Failed to add device. Unauthorized!", req.ip);
    res.status(401).send();
    return;
  }
  const device = req.body as Device;

  const checkedDevice = isDevice(device);

  if (checkedDevice == null) {
    log("Failed to add device. Bad request!", req.ip);
    res.status(400).send();
    return;
  }

  if(await deviceExists(checkedDevice.name)){
    log("Failed to add device. Device already exists!", req.ip);
    res.status(403).send();
    return;
  }

  await addDeviceDb(checkedDevice)
    .then(() => {
      log(`Added new device: ${checkedDevice.name}`, req.ip);
      res.status(201).json(checkedDevice);
    })
    .catch((reason) => {
      log("Failed to add device. Internal server error!", req.ip);
      res.status(500).json(reason);
    });
}
