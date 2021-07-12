import Logger from './logger';

const keys = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
] as const;

type Env = Record<typeof keys[number], string>;

require('dotenv').config();
export const env = Object.fromEntries(
  keys.map((key) => [key, process.env[key] ?? ''])
) as Env;

for (const key of keys) {
  Logger.info(`${key} = ${env[key]}`);
}
