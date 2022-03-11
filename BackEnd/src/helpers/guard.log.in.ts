import { Log } from "../models/model.log";

export function IsLogIn(input: any): Log | null {
  if (!input.id || !input.userId || !input.in) {
    return null;
  }
  if (
    !(typeof input.id === "string") ||
    !(typeof input.userId === "string") ||
    !(Object.prototype.toString.call(input.in) === "[object Date]")
  ) {
    return null;
  }

  const checkedLog: Log = {
    id: input.id,
    userId: input.userId,
    in: input.in,
  };
  return checkedLog;
}
