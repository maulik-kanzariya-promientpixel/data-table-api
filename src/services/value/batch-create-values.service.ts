import {
  BatchCreateDataTableValueCommand,
  type DataTableValue,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function batchCreateValue(
  tableId: string,
  value: DataTableValue[] | undefined
) {
  try {
    const command = new BatchCreateDataTableValueCommand({
      InstanceId: process.env.INSTANCE_ID,
      DataTableId: tableId,
      Values: value,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [LIST-VALUES]");
      err.cause = response.$metadata;
      throw err;
    }

    return response;
  } catch (error) {
    throw wrapAwsError("SERVICE", "BATCH-CREATE", error);
  }
}
