import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, text, varchar, date, char, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const assistSocial = mysqlTable("assist_social", {
	id: int("id").autoincrement().notNull(),
	peopleId: int("people_id").notNull(),
	contentText: text("content_text").default('NULL'),
});

	export const people = mysqlTable("people", {
		id: int("id").autoincrement().notNull(),
		name: varchar("name", { length: 255 }).notNull(),
		age: int("age").default(0),
		// you can use { mode: 'date' }, if you want to have Date as type for this column
		birthDate: date("birth_date", { mode: 'string' }).default('NULL'),
		color: varchar("color", { length: 255 }).notNull(),
		gender: char("gender", { length: 1 }).notNull(),
		// you can use { mode: 'date' }, if you want to have Date as type for this column
		admissionDate: date("admission_date", { mode: 'string' }).default('current_timestamp()').notNull(),
		document: varchar("document", { length: 255 }).default('NULL'),
		addiction: varchar("addiction", { length: 255 }).default('NULL'),
		education: varchar("education", { length: 255 }).default('NULL'),
		deficiency: varchar("deficiency", { length: 255 }).default('NULL'),
		chronicDisease: varchar("chronic_disease", { length: 255 }).default('NULL'),
		checkoutReason: varchar("checkout_reason", { length: 255 }).default('NULL'),
		// you can use { mode: 'date' }, if you want to have Date as type for this column
		checkoutDate: date("checkout_date", { mode: 'string' }).default('NULL'),
		admissionReason: varchar("admission_reason", { length: 255 }).default('NULL'),
	});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 25 }).notNull(),
	password: varchar("password", { length: 25 }).notNull(),
	isAdmin: tinyint("is_admin").default(0).notNull(),
});