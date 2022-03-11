import { Address } from '../../models/address';
export function isAddress(input: any): Address | null {
  if (
    !input.country ||
    !input.postalCode ||
    !input.city ||
    !input.street ||
    !input.buildingNumber
  ) {
    return null;
  }
  if (
    !(typeof input.country === 'string') ||
    !(typeof input.postalCode === 'string') ||
    !(typeof input.city === 'string') ||
    !(typeof input.street === 'string') ||
    !(typeof input.buildingNumber === 'string')
  ) {
    return null;
  }
  const checkedAddress: Address = {
    country: input.country,
    postalCode: input.postalCode,
    city: input.city,
    street: input.street,
    buildingNumber: input.buildingNumber,
  };

  if (input.stateOrProvince) {
    if (!(typeof input.stateOrProvince === 'string')) {
      return null;
    }
    checkedAddress.stateOrProvince = input.stateOrProvince;
  }
  return checkedAddress;
}
