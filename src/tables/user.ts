import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { CommonModifier } from './common';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  ...CommonModifier,
});
