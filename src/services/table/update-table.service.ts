import {
  UpdateDataTableMetadataCommand,
  type DataTableLockLevel,
} from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";

export default async function updateTable(
  DataTableId: string,
  parsedData: {
    name: string;
    timezone: string;
    description: string | undefined;
    valueLockLevel: DataTableLockLevel;
  },
) {
  try {
    const command = new UpdateDataTableMetadataCommand({
      InstanceId: process.env.INSTANCE_ID,
      DataTableId,
      Name: parsedData.name,
      TimeZone: parsedData.timezone,
      ...(parsedData.description !== undefined && {
        Description: parsedData.description,
      }),
      ValueLockLevel: parsedData.valueLockLevel,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [UPDATE-TABLE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response.LockVersion;
  } catch (err) {
    throw wrapAwsError("SERVICE", "UPDATE-TABLE", err);
  }
}
