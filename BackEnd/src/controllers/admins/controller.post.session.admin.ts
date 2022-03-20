import { Request, Response } from "express";
import { Admin } from "../../models/model.admin";
import Express from "express";
import { loginAdmin } from "../../db.services/db.admin.userService";
import bodyParser from "body-parser";
import { log } from "../../db.services/db.logging.service";

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
    log("Failed to verify admin. Bad request!", req.ip);
    res.status(400).send();
    return;
  }

  if (
    !(typeof admin.username === "string") ||
    !(typeof admin.password === "string")
  ) {
    log("Failed to verify admin. Bad request!", req.ip);
    res.status(400).send();
    return;
  }

  loginAdmin(admin.username, admin.password)
    .then((admin) => {
      if (admin != null) {
        admin.password = "";
        log(`Verified admin: ${admin.username}`, req.ip);
        res.status(200).json(admin);
      } else {
        log(`Failed to verify admin. Unauthorized!`, req.ip);
        res.status(401).send();
      }
    })
    .catch((reason) => {
      log(`Failed to verify admin. Internal server error!`, req.ip);
      res.status(500).json(reason);
    });
}
