import {
  UpdateDataTablePrimaryValuesCommand,
  type PrimaryValue,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

interface UpdatePrimaryValue {
  AttributeName: string;
  Value: string;
}

export default async function updateTablePrimaryValue(
  instanceId: string,
  tableId: string,
  primaryValue: UpdatePrimaryValue[],
  newPrimaryValues: UpdatePrimaryValue[]
) {
  try {
    const convertToPrimaryValue = (
      values: UpdatePrimaryValue[]
    ): PrimaryValue[] =>
      values.map((v) => ({
        AttributeName: v.AttributeName,
        Value: v.Value,
      }));

    const command = new UpdateDataTablePrimaryValuesCommand({
      InstanceId: instanceId,
      DataTableId: tableId,
      PrimaryValues: convertToPrimaryValue(primaryValue),
      NewPrimaryValues: convertToPrimaryValue(newPrimaryValues),
      LockVersion: { Value: "0" },
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error(
        "Error occurred at: [SERVICE] [UPDATE-PRIMARY-VALUE]"
      );
      err.cause = response.$metadata;
      throw err;
    }

    return response.LockVersion;
  } catch (error) {
    throw wrapAwsError("SERVICE", "UPDATE-PRIMARY-VALUE", error);
  }
}
