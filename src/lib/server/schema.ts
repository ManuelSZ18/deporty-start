import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: text('role').notNull(), // We can perform clearer role management later or use an enum
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
