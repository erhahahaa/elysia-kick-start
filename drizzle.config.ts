import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import { env } from 'process';

const schemaFiles = fs.readdirSync('./src/schemas').filter((file) => {
  const content = fs.readFileSync(`./src/schemas/${file}`, 'utf8');
  return content.includes('pgTable');
});

export default defineConfig({
  out: './drizzle',
  schema: schemaFiles.map((file) => `./src/schemas/${file}`),
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DB_URL || 'localhost',
    port: env.DB_PORT || 5432,
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'myapp',
  },
});
