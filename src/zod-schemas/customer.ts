import { customers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const insertCustomerSchema = createInsertSchema(customers,{
    firstName: (schema) => schema.min(1, "First Name is required"),
    lastName: (schema) => schema.min(1, "Last Name is required"),
    email:(schema) => schema.email("Invalid email address"),
    phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number use 123-456-7890"),
    address1: (schema) => schema.min(1, "Address is required"),
    city:(schema) => schema.min(1, "City is required"),
    state:(schema) => schema.length(2, "State must be exactly 2 characters"),
    zip:(schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code use 5 digits or 5-4 digits")
})
export const selectCustomerSchema = createSelectSchema(customers);
export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;