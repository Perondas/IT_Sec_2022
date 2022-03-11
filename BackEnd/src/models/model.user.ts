import { Address } from "./model.address";

export interface User {
  uuid: string;
  name: string;
  address: Address;
}
