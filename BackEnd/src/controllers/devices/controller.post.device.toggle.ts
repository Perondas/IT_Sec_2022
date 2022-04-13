import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { toggleDeviceDb } from "../../db.services/db.deviceService";
import { log } from "../../db.services/db.logging.service";

export async function registerToggleDevices(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/devices/:deviceId/toggle", jsonParser, toggleDevice);
}

async function toggleDevice(req: Request, res: Response) {
  if (!req.params["deviceId"]) {
    log("Failed to toggle device. Bad request!", req.ip);
    res.status(400).send();
    return;
  }
  const deviceId = req.params["deviceId"];
  toggleDeviceDb(deviceId).then(() => {
    log(`Toggled device: ${deviceId}`, req.ip);
    res.status(204).send();
  })
  .catch((reason) => {
    log("Failed to toggle device. Internal server error!", req.ip);
    res.status(500).json(reason);
  });
}
