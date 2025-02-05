import { drizzle } from 'drizzle-orm/postgres-js';

import { table } from '@/tables';
import Elysia from 'elysia';
import postgres from 'postgres';
import { Config } from '../config';

const client = postgres({
  host: Config.DB.URL,
  port: Config.DB.PORT,
  username: Config.DB.USER,
  password: Config.DB.PASSWORD,
  database: Config.DB.DATABASE,
  max: Config.DB.MAX,
});

export const drizzleClient = drizzle({
  client: client,
  schema: table,
});

export const DatabaseService = new Elysia().derive({ as: 'global' }, () => ({
  db: drizzleClient,
}));
