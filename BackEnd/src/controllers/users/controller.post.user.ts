import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { User } from "../../models/model.user";
import { addUserDb } from "../../db.services/db.user.userService";
import { isUserNoUUID } from "../../helpers/guard.user";
import { authorizeAdmin } from "../../auth/auth.admin";

export async function registerAddUser(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.post("/users/users", jsonParser, addUser);
}

async function addUser(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    res.status(401).send();
    return;
  }
  const user = req.body as User;

  const checkedUser = isUserNoUUID(user);

  if (checkedUser == null) {
    res.status(400).send();
    return;
  }
  await addUserDb(checkedUser)
    .then(() => {
      res.status(201).json(checkedUser);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
