const { pgTable, text, timestamp, uuid } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

module.exports = { users };
