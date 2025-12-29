import * as z from "zod";
import {
  primaryValueSchema,
  primaryValueFilterSchema,
  lockVersionSchema,
} from "./common.schema.js";

export const listValuesSchema = z
  .object({
    recordIds: z
      .array(z.string().min(1, "Record ID cannot be empty"))
      .optional(),
    primaryValues: z.array(primaryValueFilterSchema).optional(),
  })
  .optional();

export const updatePrimaryValueSchema = z.object({
  primaryValue: z
    .array(primaryValueSchema)
    .min(1, "At least one primary value is required"),
  newPrimaryValue: z
    .array(primaryValueSchema)
    .min(1, "At least one new primary value is required"),
});

export const batchValueSchema = z.object({
  values: z
    .array(
      z.object({
        PrimaryValues: z
          .array(primaryValueSchema)
          .min(1, "At least one primary value is required"),
        AttributeName: z.string().min(1, "Attribute name is required"),
        Value: z.string().min(1, "Value is required"),
        LockVersion: lockVersionSchema,
      })
    )
    .min(1, "At least one value is required"),
});

export const batchDeleteValueSchema = z.object({
  values: z
    .array(
      z.object({
        PrimaryValues: z
          .array(primaryValueSchema)
          .min(1, "At least one primary value is required"),
        AttributeName: z.string().min(1, "Attribute name is required"),
        LockVersion: lockVersionSchema,
      })
    )
    .min(1, "At least one value is required"),
});

export const batchDescribeValueSchema = z.object({
  values: z
    .array(
      z.object({
        PrimaryValues: z
          .array(primaryValueSchema)
          .min(1, "At least one primary value is required"),
        AttributeName: z.string().min(1, "Attribute name is required"),
        Value: z.string().min(1, "Value is required"),
      })
    )
    .min(1, "At least one value is required"),
});

export const getValuesSchema = listValuesSchema;
export const batchValue = batchValueSchema;
