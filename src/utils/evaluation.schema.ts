import { z } from "zod";

export const searchTableSchema = z
  .object({
    operationType: z.enum(["AND", "OR"]),

    name: z
      .string()
      .min(1, "Name must not be empty")
      .max(255, "Name is too long")
      .optional(),

    description: z
      .string()
      .min(1, "Description must not be empty")
      .max(1000, "Description is too long")
      .optional(),

    tags: z
      .record(
        z
          .string()
          .min(1, "Tag value must not be empty")
          .max(256, "Tag value is too long"),
        z
          .string()
          .min(1, "Tag value must not be empty")
          .max(256, "Tag value is too long"),
      )
      .optional(),
  })
  .refine(
    (data) =>
      data.name ||
      data.description ||
      (data.tags && Object.keys(data.tags).length > 0),
    {
      message:
        "At least one search filter (name, description, or tags) must be provided",
      path: ["filters"],
    },
  );

// Schema for individual data table values (key-value pairs)
const DataTableValueSchema = z.record(z.string().min(1), z.string());

// Schema for primary value object
const PrimaryValueSchema = z.object({
  AttributeName: z.string().min(1, "Attribute name is required"),
  Value: z.string().min(1, "Value is required"),
});

// Schema for evaluation set - contains attribute names, row values, and primary values
const DataTableValueEvaluationSetSchema = z.object({
  AttributeNames: z
    .array(z.string().min(1))
    .min(1, "At least one attribute name is required"),
  RowValues: DataTableValueSchema,
  PrimaryValues: z
    .array(PrimaryValueSchema)
    .min(1, "At least one primary value is required"), // Array of PrimaryValue objects
});

export const EvaluateDataTableValuesSchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  values: z
    .array(DataTableValueEvaluationSetSchema)
    .min(1, "At least one evaluation set is required"),
});
