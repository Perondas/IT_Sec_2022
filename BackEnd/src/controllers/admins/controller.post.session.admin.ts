import { Request, Response } from "express";
import { Admin } from "../../models/model.admin";
import Express from "express";
import { loginAdmin } from "../../db.services/db.admin.userService";
import bodyParser from "body-parser";

export async function registerSessionAdmin(app: Express.Express) {
  const jsonParser = bodyParser.json();
  app.post("/session/admin", jsonParser, verifyAdmin);
}

async function verifyAdmin(req: Request, res: Response) {
  const admin: Admin = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!admin.username || !admin.password) {
    res.status(400).send();
    return;
  }

  if (
    !(typeof admin.username === "string") ||
    !(typeof admin.password === "string")
  ) {
    res.status(400).send();
    return;
  }

  loginAdmin(admin.username, admin.password)
    .then((admin) => {
      if (admin != null) {
        admin.password = "";
        res.status(200).json(admin);
      } else {
        res.status(401).send();
      }
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
}
