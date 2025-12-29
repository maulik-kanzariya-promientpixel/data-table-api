import { z } from "zod";

export const CreateDataTableSchema = z
  .object({
    name: z
      .string()
      .min(3, "Table name must be at least 3 characters")
      .max(128, "Table name must be at most 128 characters")
      .trim(),

    timezone: z.string().min(1, "Timezone cannot be empty").trim(),

    description: z
      .string()
      .max(500, "Description must be at most 500 characters")
      .optional()
      .or(z.literal("")),

    status: z.enum(["PUBLISHED"]).optional(),

    valueLockLevel: z.enum([
      "ATTRIBUTE",
      "DATA_TABLE",
      "NONE",
      "PRIMARY_VALUE",
      "VALUE",
    ]),

    tags: z
      .record(
        z.string().min(1, "Tag key cannot be empty"),
        z.string().min(1, "Tag value cannot be empty")
      )
      .optional(),
  })
  .strict();

export const UpdateDataTableSchema = z
  .object({
    name: z
      .string()
      .min(1, "Table name must be at least 1 character")
      .max(127, "Table name must be at most 127 characters")
      .trim(),

    timezone: z.string().min(1, "Timezone cannot be empty").trim(),

    valueLockLevel: z.enum([
      "ATTRIBUTE",
      "DATA_TABLE",
      "NONE",
      "PRIMARY_VALUE",
      "VALUE",
    ]),

    description: z
      .string()
      .max(250, "Description must be at most 250 characters")
      .optional()
      .or(z.literal("")),
  })
  .strict();
