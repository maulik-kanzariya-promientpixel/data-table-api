import * as z from "zod";

export const getValuesSchema = z
  .object({
    recordIds: z.array(z.string()).optional(),
    primaryValues: z
      .array(
        z.object({
          AttributeName: z.string(),
          Values: z.array(z.string()),
        })
      )
      .optional(),
  })
  .optional();

export const updatePrimaryValueSchema = z.object({
  primaryValue: z.array(
    z.object({
      AttributeName: z.string(),
      Value: z.string(),
    })
  ),
  newPrimaryValue: z.array(
    z.object({
      AttributeName: z.string(),
      Value: z.string(),
    })
  ),
});

export const batchValue = z.object({
  values: z.array(
    z.object({
      PrimaryValues: z.array(
        z.object({
          AttributeName: z.string(),
          Value: z.string(),
        })
      ),
      AttributeName: z.string(),
      Value: z.string(),
      LockVersion: z.object({
        Value: z.string(),
      }),
    })
  ),
});

export const batchDeleteValueSchema = z.object({
  values: z.array(
    z.object({
      PrimaryValues: z.array(
        z.object({
          AttributeName: z.string(),
          Value: z.string(),
        })
      ),
      AttributeName: z.string(),
      LockVersion: z.object({
        Value: z.string(),
      }),
    })
  ),
});

export const batchUpdateSchema = z.object({
  values: z.array(
    z.object({
      PrimaryValues: z.array(
        z.object({
          AttributeName: z.string(),
          Value: z.string(),
        })
      ),
      AttributeName: z.string(),
      LockVersion: z.object({
        Value: z.string(),
      }),
    })
  ),
});

export const batchDeleteSchema = z.object({
  values: z.array(
    z.object({
      PrimaryValues: z.array(
        z.object({
          AttributeName: z.string(),
          Value: z.string(),
        })
      ),
      AttributeName: z.string(),
      LockVersion: z.object({
        Value: z.string(),
      }),
    })
  ),
});

export const batchDescribeSchema = z.object({
  values: z.array(
    z.object({
      PrimaryValues: z.array(
        z.object({
          AttributeName: z.string(),
          Value: z.string(),
        })
      ),
      AttributeName: z.string(),
      Value: z.string(),
    })
  ),
});
