import { Log } from "../models/model.log";

export function IsLogOut(input: any): Log | null {
  if (!input.id || !input.userId || !input.in || !input.out) {
    return null;
  }
  if (
    !(typeof input.id === "string") ||
    !(typeof input.userId === "string") ||
    !(Object.prototype.toString.call(input.in) === "[object Date]") ||
    !(Object.prototype.toString.call(input.out) === "[object Date]")
  ) {
    return null;
  }

  const checkedLog: Log = {
    id: input.id,
    userId: input.userId,
    in: input.in,
    out: input.out,
  };
  return checkedLog;
}
