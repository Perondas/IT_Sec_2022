import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { getAllDevices } from "../../db.services/db.deviceService";
import { log } from "../../db.services/db.logging.service";

export async function registerGetDevices(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.get("/devices", jsonParser, getDevices);
}

async function getDevices(req: Request, res: Response) {
  getAllDevices()
    .then((devices) => {
      log("Sending all devices", req.ip);
      res.status(200).json(devices);
      return;
    })
    .catch((reason) => {
      log("Failed to send all devices. Internal server error!", req.ip);
      res.status(500).json(reason);
    });
}
