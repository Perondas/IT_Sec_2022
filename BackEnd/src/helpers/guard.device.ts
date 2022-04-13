import { Device } from "../models/model.device";

export function isDevice(input: any): Device | null {
  if (!input.name || !input.type || ! input.manufacturer || !input.place || input.isOn == null) {
    return null;
  }

  if (
    !(typeof input.name === "string") ||
    !(typeof input.type === "string") ||
    !(typeof input.manufacturer === "string") ||
    !(typeof input.place === "string") ||
    !(typeof input.isOn === "boolean")
  ) {
    return null;
  }

  return {
    name: input.name,
    type: input.type,
    manufacturer: input.manufacturer,
    place: input.place,
    isOn: input.isOn
  };
}
