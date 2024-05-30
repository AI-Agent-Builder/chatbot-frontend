import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from "./schema";

// for migrations
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });

console.log('process.env.DB_URL::', process.env.DB_URL as string)

// for query purposes
const queryClient = postgres("postgres://frontend:Aoyae.c4ie@10.10.15.72:5432/chatbot-ai");
export const db = drizzle(queryClient, { schema });
