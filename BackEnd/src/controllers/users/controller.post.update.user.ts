import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import {
  updateUserDb,
  userExists,
} from "../../db.services/db.user.userService";
import { authorizeAdmin } from "../../auth/auth.admin";
import { isUser } from "../../helpers/guard.user";

export async function registerUpdateUsers(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/users/users/:uuid", jsonParser, updateUser);
}

async function updateUser(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    res.status(401).send();
    return;
  }

  if (!req.params["uuid"]) {
    res.status(400).send();
    return;
  }
  const uuid = req.params["uuid"];
  const user = req.body;

  const checkedUser = isUser(user);

  if (checkedUser === null || checkedUser.uuid !== uuid) {
    res.status(400).send();
  }

  if (!(await userExists(uuid))) {
    res.status(404).send();
    return;
  }

  updateUserDb(user)
    .then(() => {
      res.status(200).send();
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
