import { User } from './user';

export interface FlatUser {
  uuid: string;
  name: string;
  country: string;
  postalCode: string;
  stateOrProvince?: string;
  city: string;
  street: string;
  buildingNumber: string;
}

export function toFlat(user: User): FlatUser {
  return {
    uuid: user.uuid,
    name: user.name,
    country: user.address.country,
    postalCode: user.address.postalCode,
    stateOrProvince: user.address.stateOrProvince,
    city: user.address.city,
    street: user.address.street,
    buildingNumber: user.address.buildingNumber,
  };
}
