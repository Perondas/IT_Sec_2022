import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { userExists } from "../../db.services/db.user.userService";
import {
  logsCheckInUser,
  userHasUnfulfilled,
} from "../../db.services/db.logs.service";

export async function registerCheckInUsers(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/logs/in/:userId", jsonParser, checkInUser);
}

async function checkInUser(req: Request, res: Response) {
  if (!req.params["userId"]) {
    res.status(400).send();
    return;
  }
  const userId = req.params["userId"];
  userExists(userId)
    .then((exists) => {
      if (exists) {
        userHasUnfulfilled(userId)
          .then((hasUnfulfilled) => {
            if (!hasUnfulfilled) {
              logsCheckInUser(userId)
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
