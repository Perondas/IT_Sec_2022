import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import {
  deleteUserDb,
  userExists,
} from "../../db.services/db.user.userService";
import { authorizeAdmin } from "../../auth/auth.admin";

export async function registerDeleteUsers(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.delete("/users/users/:uuid", jsonParser, deleteUser);
}

async function deleteUser(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    res.status(401).send();
    return;
  }

  if (!req.params["uuid"]) {
    res.status(400).send();
    return;
  }
  const uuid = req.params["uuid"];

  if (!(await userExists(uuid))) {
    res.status(404).send();
    return;
  }

  deleteUserDb(uuid)
    .then(() => {
      res.status(200).send();
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
