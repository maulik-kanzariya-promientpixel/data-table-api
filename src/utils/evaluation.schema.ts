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



  const PrimaryValueSchema = z.object({
  AttributeName: z.string().min(1, "AttributeName is required"),
  Value: z.string().min(1, "Value is required"),
});

const EvaluationValueSchema = z.object({
  PrimaryValues: z
    .array(PrimaryValueSchema)
    .min(1, "At least one PrimaryValue is required"),

  AttributeNames: z
    .array(z.string().min(1))
    .min(1, "At least one AttributeName is required"),
});

export const EvaluateDataTableRequestSchema = z.object({
  timezone: z.string().min(1, "timezone is required"),

  values: z
    .array(EvaluationValueSchema)
    .min(1, "At least one values entry is required"),
});