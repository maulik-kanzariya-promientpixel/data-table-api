import {
  UpdateDataTablePrimaryValuesCommand,
  type PrimaryValue,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function updateTablePrimaryValue(
  tableId: string,
  primaryValue: PrimaryValue[],
  newPrimaryValues: PrimaryValue[]
) {
  try {
    const command = new UpdateDataTablePrimaryValuesCommand({
      InstanceId: process.env.INSTANCE_ID,
      DataTableId: tableId,
      PrimaryValues: primaryValue,
      NewPrimaryValues: newPrimaryValues,
      LockVersion: { Value: "0" },
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [LIST-VALUES]");
      err.cause = response.$metadata;
      throw err;
    }

    return response.LockVersion;
  } catch (error) {
    throw wrapAwsError("SERVICE", "UPDATE-PRIMARY-VALUE", error);
  }
}
