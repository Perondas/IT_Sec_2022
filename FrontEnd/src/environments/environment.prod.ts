import json from '../../package.json';

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000',
  minPw: 8,
  version: json.version,
  name: json.name,
};
