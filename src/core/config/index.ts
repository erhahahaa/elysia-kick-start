import { normalizeMetaString } from '@/utils';
import fs from 'fs';
import { Options } from 'logixlysia/src/types';

const meta = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const Logger: Options = {
  config: {
    showStartupMessage: true,
    startupMessageFormat: 'simple',
    timestamp: {
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
    ip: true,
    logFilePath: './logs/example.log',
    customLogFormat:
      '🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip} {epoch}',
  },
} as const;

export const Database = {
  URL: Bun.env.DB_URL || 'localhost',
  PORT: Bun.env.DB_PORT || 5432,
  USER: Bun.env.DB_USER || 'postgres',
  PASSWORD: Bun.env.DB_PASSWORD || 'password',
  DATABASE: Bun.env.DB_NAME || 'myapp',
  MAX: 20,
} as const;

export const Config = {
  NAME: normalizeMetaString(meta.name),
  VERSION: meta.version,
  PORT: Bun.env.API_PORT || 3000,
  JWT_SECRET: Bun.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: Math.floor(Date.now() / 1000) + 30 * 86400, // 30 days
  DB: Database,
  Logger,
} as const;
