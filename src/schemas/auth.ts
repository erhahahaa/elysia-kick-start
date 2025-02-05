import { Static, t } from 'elysia';
import { CreateUserSchema, SelectUserSchema } from './user';

export const JWTSchema = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  exp: t.Number(),
  iat: t.Number(),
});

export const LoginSchema = t.Pick(SelectUserSchema, ['email', 'password']);
export const LoginResponseSchema = t.Object({
  user: t.Omit(SelectUserSchema, ['password']),
  token: t.String(),
});

export const RegisterSchema = t.Omit(CreateUserSchema, [
  'id',
  'createdAt',
  'updatedAt',
]);
export const RegisterResponseSchema = LoginResponseSchema;

export const AuthHeaderSchema = t.Object({
  Authorization: t.String(),
});

export type JWT = Static<typeof JWTSchema>;
