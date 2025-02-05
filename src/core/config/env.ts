import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Static, t } from 'elysia';

const EnvSchema = t.Object({
  API_PORT: t.String(),
  JWT_SECRET: t.String(),
  SALT_ROUNDS: t.Number(),

  DB_URL: t.String(),
  DB_PORT: t.Number(),
  DB_USER: t.String(),
  DB_PASSWORD: t.String(),
  DB_NAME: t.String(),
});

type Env = Static<typeof EnvSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env { }
  }
}

const parseEnv = () => {
  const EnvCompiler = TypeCompiler.Compile(EnvSchema);
  const err = EnvCompiler.Errors(Bun.env);
  const errs = [...err];
  if (errs.length > 0) {
    errs.forEach((err) => {
      console.error({
        path: err.path,
        message: err.message,
        actualValue: err.value,
      });
    });
    return process.exit(1);
  }

  return EnvCompiler.Decode(Bun.env);
};

export const env = parseEnv();
