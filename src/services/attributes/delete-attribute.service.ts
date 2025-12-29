import { DeleteDataTableAttributeCommand } from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function deleteTableAttribute(
  instanceId: string,
  DataTableId: string,
  name: string
) {
  try {
    const command = new DeleteDataTableAttributeCommand({
      InstanceId: instanceId,
      DataTableId,
      AttributeName: name,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [DELETE-ATTRIBUTE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response.LockVersion;
  } catch (err) {
    throw wrapAwsError("SERVICE", "DELETE-ATTRIBUTE", err);
  }
}
