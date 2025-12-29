import {
  BatchDescribeDataTableValueCommand,
  type DataTableValue,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function batchDescribeValue(
  instanceId: string,
  tableId: string,
  value: DataTableValue[] | undefined
) {
  try {
    const command = new BatchDescribeDataTableValueCommand({
      InstanceId: instanceId,
      DataTableId: tableId,
      Values: value,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [BATCH-DESCRIBE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response;
  } catch (error) {
    throw wrapAwsError("SERVICE", "BATCH-DESCRIBE", error);
  }
}
