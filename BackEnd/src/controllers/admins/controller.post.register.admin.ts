import { Request, Response } from "express";
import { addAdministrator } from "../../db.services/db.admin.userService";
import { Admin } from "../../models/model.admin";
import Express from "express";
import bodyParser from "body-parser";
import { isAdmin } from "../../helpers/guard.admin";
import { log } from "../../db.services/db.logging.service";

export async function registerAdminRegistration(app: Express.Express) {
  const jsonParser = bodyParser.json();
  app.post("/users/admins", jsonParser, registerAdmin);
}

async function registerAdmin(req: Request, res: Response) {
  const admin = req.body as Admin;

  const checkedAdmin = isAdmin(admin);

  if (checkedAdmin == null) {
    log("Failed to create new admin. Bad request!", req.ip);
    res.status(400).send();
    return;
  }
  addAdministrator(checkedAdmin)
    .then(() => {
      checkedAdmin.password = "";
      log(`Created new administrator with username: ${checkedAdmin.username}`, req.ip);
      res.status(201).json(checkedAdmin);
    })
    .catch((reason) => {
      if (reason === "User already exists!") {
        log(`Failed to create user: ${checkedAdmin.username}. User already exists!`, req.ip);
        res.status(409).send();
      } else {
        log(`Failed to create user: ${checkedAdmin.username}. Internal server error!`, req.ip);
        res.status(500).json(reason);
      }
    });
}
