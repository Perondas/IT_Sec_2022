import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import {
  logExists,
  logFulfilled,
  logsCheckOutUser,
} from "../../db.services/db.logs.service";

export async function registerCheckOutUsers(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/logs/out/:logId", jsonParser, checkOutUser);
}

async function checkOutUser(req: Request, res: Response) {
  if (!req.params["logId"]) {
    res.status(400).send();
    return;
  }
  const logId = req.params["logId"];

  logExists(logId)
    .then((exists) => {
      if (exists) {
        logFulfilled(logId)
          .then((fulfilled) => {
            if (!fulfilled) {
              logsCheckOutUser(logId)
                .then((log) => {
                  res.status(201).json(log);
                })
                .catch((reason) => {
                  res.status(500).json(reason);
                });
            } else {
              res.status(403).send();
            }
          })
          .catch((reason) => {
            res.status(500).json(reason);
          });
      } else {
        res.status(404).send();
      }
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
