import { CreateDataTableCommand } from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";
import type { ITable } from "../../types/table.js";

export default async function createTable(params: ITable) {
  try {
    const command = new CreateDataTableCommand({
      InstanceId: process.env.INSTANCE_ID,
      Name: params.name,
      TimeZone: params.timezone,
      Status: params.status,
      Description: params.description ?? "",
      ValueLockLevel: params.valueLockLevel ?? "NONE",
      Tags: { ...params.tags, method: "API" },
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [CREATE-TABLE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response;
  } catch (err) {
    throw wrapAwsError("SERVICE", "CREATE-TABLE", err);
  }
}
