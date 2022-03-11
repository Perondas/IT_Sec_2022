import Express from "express";
import { registerGetUsers } from "./users/controller.get.users";
import { registerAdminRegistration } from "./admins/controller.post.register.admin";
import { registerAuthenticateAdmin } from "./admins/controller.head.admin";
import { registerSessionAdmin } from "./admins/controller.post.session.admin";
import { registerAddUser } from "./users/controller.post.user";
import { registerAdminUpdate } from "./admins/controller.post.update.admin";
import { registerDeleteUsers } from "./users/controller.delete.user";
import { registerUpdateUsers } from "./users/controller.post.update.user";
import { registerCheckInUsers } from "./users/controller.post.user.check-in";
import { registerCheckOutUsers } from "./users/controller.post.user.check-out";

export async function initControllers(app: Express.Express) {
  await registerAdminRegistration(app);
  await registerAuthenticateAdmin(app);
  await registerSessionAdmin(app);
  await registerAdminUpdate(app);
  await registerAddUser(app);
  await registerGetUsers(app);
  await registerDeleteUsers(app);
  await registerUpdateUsers(app);
  await registerCheckInUsers(app);
  await registerCheckOutUsers(app);
}
