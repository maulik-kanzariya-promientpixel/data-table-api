import * as z from "zod";
import type { Validation } from "@aws-sdk/client-connect";

export const DataTableAttributeValidationSchema: z.ZodType<Validation> = z
  .object({
    Enum: z
      .object({
        Strict: z.boolean().optional(),
        Values: z.array(z.string()).optional(),
      })
      .optional(),

    ExclusiveMaximum: z.number().optional(),
    ExclusiveMinimum: z.number().optional(),
    IgnoreCase: z.boolean().optional(),
    Maximum: z.number().optional(),
    MaxLength: z.number().optional(),
    MaxValues: z.number().optional(),
    Minimum: z.number().optional(),
    MinLength: z.number().optional(),
    MinValues: z.number().optional(),
    MultipleOf: z.number().optional(),
  })
  .strict();

export const CreateDataTableAttributeInputSchema = z
  .object({
    name: z.string().min(1).max(127).trim(),

    valueType: z.enum([
      "BOOLEAN",
      "NUMBER",
      "NUMBER_LIST",
      "TEXT",
      "TEXT_LIST",
    ]),

    description: z.string().max(250).optional().or(z.literal("")),

    primary: z.boolean().optional(),

    validation: DataTableAttributeValidationSchema.optional(),
  })
  .strict();

export const UpdateDataTableAttributeSchema = z
  .object({
    name: z.string().min(1).max(127).trim(),

    newName: z.string().min(1).max(127).trim().optional(),

    valueType: z.enum([
      "BOOLEAN",
      "NUMBER",
      "NUMBER_LIST",
      "TEXT",
      "TEXT_LIST",
    ]),

    description: z.string().max(250).optional().or(z.literal("")),

    primary: z.boolean().optional(),

    validation: DataTableAttributeValidationSchema.optional(),
  })
  .strict();
