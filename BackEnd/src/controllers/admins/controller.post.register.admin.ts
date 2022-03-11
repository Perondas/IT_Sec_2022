import { Request, Response } from "express";
import { addAdministrator } from "../../db.services/db.admin.userService";
import { Admin } from "../../models/model.admin";
import Express from "express";
import bodyParser from "body-parser";
import { isAdmin } from "../../helpers/guard.admin";

export async function registerAdminRegistration(app: Express.Express) {
  const jsonParser = bodyParser.json();
  app.post("/users/admins", jsonParser, registerAdmin);
}

async function registerAdmin(req: Request, res: Response) {
  const admin = req.body as Admin;

  const checkedAdmin = isAdmin(admin);

  if (checkedAdmin == null) {
    res.status(400).send();
    return;
  }
  addAdministrator(checkedAdmin)
    .then(() => {
      checkedAdmin.password = "";
      res.status(201).json(checkedAdmin);
    })
    .catch((reason) => {
      if (reason === "User already exists!") {
        res.status(409).send();
      } else {
        res.status(500).json(reason);
      }
    });
}
