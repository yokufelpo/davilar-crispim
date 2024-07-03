import { database, host, password, user } from '@/config/drizzle';
import type { Config } from 'drizzle-kit';
export default {
  schema: './src/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host,
    user,
    password,
    database,
  },
} satisfies Config;
