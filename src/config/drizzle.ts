import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../../drizzle/schema';

export const host = '185.211.7.52';
export const user = 'u884262131_casadedavi';
export const password = '@Casadedavi!23';
export const database = 'u884262131_acolhimentodav';

export async function getDataBase() {
  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  return drizzle(connection, { schema, mode: 'default' });
}
