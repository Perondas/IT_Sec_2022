import { Request, Response } from "express";
import {
  checkAdmin,
  updateAdminDb,
} from "../../db.services/db.admin.userService";
import Express from "express";
import bodyParser from "body-parser";
import { isAdmin } from "../../helpers/guard.admin";
import { authorizeAdmin } from "../../auth/auth.admin";

export async function registerAdminUpdate(app: Express.Express) {
  const jsonParser = bodyParser.json();
  app.post("/users/admins/:username", jsonParser, updateAdmin);
}

async function updateAdmin(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    res.status(401).send();
    return;
  }

  if (!req.params["username"]) {
    res.status(400).send();
  }
  const name = req.params["username"];

  const admin = req.body;

  const checkedAdmin = isAdmin(admin);

  if (checkedAdmin == null || checkedAdmin.username !== name) {
    res.status(400).send();
    return;
  }

  checkAdmin(name)
    .then((exists) => {
      if (!exists) {
        res.status(404).send();
        return;
      }
      updateAdminDb(checkedAdmin)
        .then(() => {
          checkedAdmin.password = "";
          res.status(200).json(checkedAdmin);
        })
        .catch((reason) => {
          res.status(500).json(reason);
        });
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
