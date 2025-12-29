import { DescribeDataTableCommand } from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function getTableById(
  instanceId: string,
  DataTableId: string
) {
  try {
    const command = new DescribeDataTableCommand({
      InstanceId: instanceId,
      DataTableId,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [CREATE-TABLE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response.DataTable;
  } catch (err) {
    throw wrapAwsError("SERVICE", "GET-TABLE", err);
  }
}
