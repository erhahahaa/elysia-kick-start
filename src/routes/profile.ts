import { BadRequestError } from '@/core/errors';
import { AuthWithUserMiddleware } from '@/core/middleware/auth';
import { DatabaseService } from '@/core/services/db';
import { RegisterSchema } from '@/schemas/auth';
import { OkResponseSchema } from '@/schemas/response';
import { SelectUserSchema } from '@/schemas/user';
import { table } from '@/tables';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

export const ProfileRouter = new Elysia()
  .prefix('all', '/profile')
  .use(DatabaseService)
  .use(AuthWithUserMiddleware)
  .get(
    '/me',
    async ({ getUser }) => {
      const user = await getUser();
      return {
        message: 'Find user success',
        data: user,
      };
    },
    {
      tags: ['Profile'],
      detail: 'This endpoint is used to get user profile',
      response: { 200: OkResponseSchema(SelectUserSchema) },
    },
  )
  .post(
    '/me',
    async ({ body, db, getUser }) =>
      await db.transaction(async (trx) => {
        const user = await getUser();
        if (body.email) user.email = body.email;
        if (body.name) user.name = body.name;
        if (body.password) user.password = body.password;

        const updated = await trx
          .update(table.user)
          .set(user)
          .where(eq(table.user.id, user.id))
          .execute();

        if (!updated[0]) {
          throw new BadRequestError('Failed to update user');
        }

        return {
          message: 'Updated',
          data: updated[0],
        };
      }),
    {
      tags: ['Profile'],
      detail: 'This endpoint is used to update user profile',
      body: t.Partial(RegisterSchema),
      response: { 200: OkResponseSchema(SelectUserSchema) },
    },
  );
