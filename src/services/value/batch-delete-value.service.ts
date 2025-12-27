import {
  BatchDeleteDataTableValueCommand,
  type DataTableDeleteValueIdentifier,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function batchDeleteValue(
  tableId: string,
  value: DataTableDeleteValueIdentifier[] | undefined
) {
  try {
    const command = new BatchDeleteDataTableValueCommand({
      InstanceId: process.env.INSTANCE_ID,
      DataTableId: tableId,
      Values: value,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [BATCH-DELETE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response;
  } catch (error) {
    throw wrapAwsError("SERVICE", "BATCH-DELETE", error);
  }
}
