import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    phone: varchar("phone", { length: 256 }).unique().notNull(),
    address1: varchar("address1", { length: 256 }).notNull(),
    address2: varchar("address2", { length: 256 }),
    city: varchar("city", { length: 256 }).notNull(),
    state: varchar("state", { length: 2 }).notNull(),
    zip: varchar("zip", { length: 10 }).notNull(),
    notes: text("notes"),
    active:boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(() => customers.id),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    tech:varchar("tech", { length: 256 }).notNull().default("unassigned"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// Create relations

export const customersRelations = relations(customers, ({ many }) => ({
    tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
    customer: one(customers, {
        fields: [tickets.customerId],
        references: [customers.id],
    }),
}));
