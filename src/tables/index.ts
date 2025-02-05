import { usersTable } from './user';

export const table = {
  user: usersTable,
} as const;

export type Table = typeof table;
