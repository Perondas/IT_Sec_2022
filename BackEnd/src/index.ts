import Express from "express";
import { readFileSync } from "fs";
import { initControllers } from "./controllers/controller.init";
import cors from "cors";
import { setUpDb } from "./db.services/db.setup";
const app = Express();
app.use(cors());

const settings = readFileSync("config.json");
const config = JSON.parse(settings.toString());

setUpDb()
  .then(() => {
    initControllers(app).then(() => {
      app.listen(config.api.port, () => {
        console.log(`Example app listening at http://localhost:${config.api.port}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
