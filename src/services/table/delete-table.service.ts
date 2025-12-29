import { DeleteDataTableCommand } from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";

export default async function deleteTable(
  instanceId: string,
  DataTableId: string
) {
  try {
    const command = new DeleteDataTableCommand({
      InstanceId: instanceId,
      DataTableId,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [DELETE-TABLE]");
        err.cause = response.$metadata;
        throw err;
      }
    }

    return response.$metadata;
  } catch (err) {
    throw wrapAwsError("SERVICE", "CREATE-TABLE", err);
  }
}
