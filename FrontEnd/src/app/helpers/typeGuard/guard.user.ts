import { User } from '../../models/user';
import { isAddress } from './guard.address';

export function isUser(input: any): User | null {
  if (!input.uuid || !input.name || !input.address) {
    return null;
  }

  if (!(typeof input.uuid === 'string') || !(typeof input.name === 'string')) {
    return null;
  }

  const address = isAddress(input.address);
  if (address == null) {
    return null;
  }

  const checkedUser: User = {
    uuid: input.uuid,
    name: input.name,
    address,
  };
  return checkedUser;
}

export function isUserNoUUID(input: any): User | null {
  if (!input.name || !input.address) {
    return null;
  }

  if (!(typeof input.name === 'string')) {
    return null;
  }

  const address = isAddress(input.address);
  if (address == null) {
    return null;
  }

  const checkedUser: User = {
    uuid: input.uuid,
    name: input.name,
    address,
  };
  return checkedUser;
}
