import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceArea: text("service_area").notNull(),
  missedCallsHandling: text("missed_calls_handling").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
