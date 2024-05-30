import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const traits = pgTable('traits', {
  trait: varchar('trait', { length: 25 }).primaryKey(),
  descr: varchar('descr', { length: 300 }).primaryKey(),
});

export const expertises = pgTable('expertises', {
  expertise: varchar('expertise', { length: 25 }).primaryKey(),
  descr: varchar('descr', { length: 300 }).primaryKey(),
});