import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const careAssessments = mysqlTable("care_assessments", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 320 }),
  location: varchar("location", { length: 128 }).notNull(),
  careType: varchar("careType", { length: 128 }).notNull(),
  urgency: varchar("urgency", { length: 64 }),
  additionalDetails: text("additionalDetails"),
  preferredContactTime: varchar("preferredContactTime", { length: 64 }),
  relationship: varchar("relationship", { length: 64 }),
  status: mysqlEnum("status", ["new", "contacted", "in_progress", "completed", "cancelled"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CareAssessment = typeof careAssessments.$inferSelect;
export type InsertCareAssessment = typeof careAssessments.$inferInsert;
