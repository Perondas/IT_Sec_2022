import { Request, Response } from "express";
import Express from "express";
import { getAllLogs, log } from "../../db.services/db.logging.service";
import bodyParser from "body-parser";

export async function registerGetLogs(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.get("/logs", jsonParser, getLogs);
}

async function getLogs(req: Request, res: Response) {
  getAllLogs()
    .then((devices) => {
      log("Sending all logs", req.ip);
      res.status(200).json(devices);
      return;
    })
    .catch((reason) => {
      log("Failed to send all logs. Internal server error!", req.ip);
      res.status(500).json(reason);
    });
}
