import { Static, t, TSchema } from 'elysia';

export const OkResponseSchema = <T extends TSchema>(schema: T) =>
  t.Object({
    message: t.Optional(t.String()),
    data: t.Optional(schema),
  });
export const FailResponseSchema = t.Object({
  message: t.String(),
  errors: t.Array(t.String()),
});

export const NullishSchema = t.Union([t.Null(), t.Undefined()]);
export type Nullish = Static<typeof NullishSchema>;
export type TypeOfNullish = typeof NullishSchema;
