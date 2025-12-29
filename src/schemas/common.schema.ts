import * as z from "zod";

export const primaryValueSchema = z.object({
  AttributeName: z.string().min(1, "Attribute name is required"),
  Value: z.string().min(1, "Value is required"),
});

export const primaryValueFilterSchema = z.object({
  AttributeName: z.string().min(1, "Attribute name is required"),
  Values: z
    .array(z.string().min(1, "Value cannot be empty"))
    .min(1, "At least one value is required"),
});

export const lockVersionSchema = z.object({
  Value: z.string().min(1, "Lock version value is required"),
});

export const paginationSchema = z.object({
  nextToken: z.string().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const tableIdSchema = z.string().uuid("Invalid table ID format");
