import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { checkAdmin } from "../../db.services/db.admin.userService";

export async function registerAuthenticateAdmin(app: Express.Express) {
  const jsonParser = bodyParser.json();
  app.head("/users/admins/:username", jsonParser, headCheckAdmin);
}

async function headCheckAdmin(req: Request, res: Response) {
  if (!req.params["username"]) {
    res.status(400).send();
  }
  const name = req.params["username"];

  checkAdmin(name)
    .then((result) => {
      if (result) {
        res.status(200).send();
      } else {
        res.status(404).send();
      }
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
