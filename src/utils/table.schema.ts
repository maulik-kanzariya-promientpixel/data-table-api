import { z } from "zod";

export const CreateDataTableSchema = z
  .object({
    name: z
      .string({
        error: "must be a string!",
      })
      .min(3, "Table name must be at least 3 characters")
      .max(128, "Table name must be at most 128 characters")
      .trim(),

    timezone: z
      .string({
        error: "timezone is required and must be a string",
      })
      .trim(),

    description: z
      .string({
        error: "must be a string!",
      })
      .max(500)
      .optional()
      .or(z.literal("")),

    status: z.enum(["PUBLISHED"]).optional(),

    valueLockLevel: z.enum(
      ["ATTRIBUTE", "DATA_TABLE", "NONE", "PRIMARY_VALUE", "VALUE"],
      {
        error:
          "valuelocklevel must be one of: ATTRIBUTE, DATA_TABLE, NONE,PRIMARY_VALUE,VALUE",
      },
    ),

    tags: z.record(z.string(), z.string()).optional(),
  })
  .strict();

export const UpdateDataTableSchema = z
  .object({
    name: z
      .string({
        error: "name is required and must be a string!",
      })
      .min(1, "Table name must be at least 1 character")
      .max(127, "Table name must be at most 127 characters")
      .trim(),

    timezone: z
      .string({
        error: "timezone is required and must be a string",
      })
      .trim(),

    valueLockLevel: z.enum(
      ["ATTRIBUTE", "DATA_TABLE", "NONE", "PRIMARY_VALUE", "VALUE"],
      {
        error:
          "valueLockLevel must be one of: ATTRIBUTE, DATA_TABLE, NONE, PRIMARY_VALUE, VALUE",
      },
    ),

    description: z
      .string({
        error: "description must be a string!",
      })
      .max(250)
      .optional()
      .or(z.literal("")),
  })
  .strict();
