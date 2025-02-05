import Elysia from 'elysia';
import { AuthRouter } from './auth';
import { ProfileRouter } from './profile';

export const AppRouter = new Elysia().use(AuthRouter).use(ProfileRouter);
