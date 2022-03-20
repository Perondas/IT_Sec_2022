import Express from "express";
import { registerGetDevices } from "./devices/controller.get.devices";
import { registerAdminRegistration } from "./admins/controller.post.register.admin";
import { registerSessionAdmin } from "./admins/controller.post.session.admin";
import { registerAddDevice } from "./devices/controller.post.device";
import { registerAdminUpdate } from "./admins/controller.post.update.admin";
import { registerDeleteDevices } from "./devices/controller.delete.device";
import { registerUpdateDevices } from "./devices/controller.post.update.device";
import { registerToggleDevices } from "./devices/controller.post.device.toggle";
import { registerGetLogs } from "./logsControllers/controller.get.logs";

export async function initControllers(app: Express.Express) {
  await registerAdminRegistration(app);
  await registerSessionAdmin(app);
  await registerAdminUpdate(app);
  await registerAddDevice(app);
  await registerGetDevices(app);
  await registerDeleteDevices(app);
  await registerUpdateDevices(app);
  await registerToggleDevices(app);
  await registerGetLogs(app);
}
