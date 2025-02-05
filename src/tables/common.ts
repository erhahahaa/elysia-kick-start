import { timestamp } from 'drizzle-orm/pg-core';

export const CommonModifier = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
};
