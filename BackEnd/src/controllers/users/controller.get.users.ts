import { Request, Response } from "express";
import Express from "express";
import bodyParser from "body-parser";
import { getAllUsers } from "../../db.services/db.user.userService";
import { authorizeAdmin } from "../../auth/auth.admin";

export async function registerGetUsers(app: Express.Express) {
  const jsonParser = bodyParser.json();

  app.get("/users/users", jsonParser, getUsers);
}

async function getUsers(req: Request, res: Response) {
  if (!(await authorizeAdmin(req))) {
    res.status(401).send();
    return;
  }

  getAllUsers()
    .then((users) => {
      res.status(200).json(users);
      return;
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
