import { Address } from './address';
import { FlatUser } from './flatUser';

export interface User {
  uuid: string;
  name: string;
  address: Address;
}

export function fromFlat(flat: FlatUser): User {
  return {
    uuid: flat.uuid,
    name: flat.name,
    address: {
      country: flat.country,
      stateOrProvince: flat.stateOrProvince,
      postalCode: flat.postalCode,
      city: flat.city,
      street: flat.street,
      buildingNumber: flat.buildingNumber,
    },
  };
}
