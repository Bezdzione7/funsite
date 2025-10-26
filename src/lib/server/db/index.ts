import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || '';

if (!DATABASE_URL) {
  console.warn('DATABASE_URL is not set - database features will not work');
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    client: postgres.Sql | undefined;
};

const client = DATABASE_URL ? (globalForDb.client ?? postgres(DATABASE_URL)) : null as any;
if (import.meta.env.MODE !== 'production' && client) globalForDb.client = client;

export const db = client ? drizzle(client, { schema }) : null as any;