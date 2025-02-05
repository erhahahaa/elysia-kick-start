import { table } from '@/tables';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-typebox';
import { Static, t } from 'elysia';

export const SelectUserSchema = createSelectSchema(table.user);
export const CreateUserSchema = createInsertSchema(table.user, {
  email: t.String({ format: 'email' }),
});
export const UpdateUserSchema = createUpdateSchema(table.user);

export type SelectUser = Static<typeof SelectUserSchema>;
export type CreateUser = Static<typeof CreateUserSchema>;
export type UpdateUser = Static<typeof UpdateUserSchema>;
