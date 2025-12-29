import { DescribeDataTableAttributeCommand } from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function getTableAttributeById(
  instanceId: string,
  tableId: string,
  name: string
) {
  try {
    const command = new DescribeDataTableAttributeCommand({
      InstanceId: instanceId,
      DataTableId: tableId,
      AttributeName: name,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error(
        "Error occurred at: [SERVICE] [GET-ATTRIBUTE-BY-ID]"
      );
      err.cause = response.$metadata;
      throw err;
    }

    return response.Attribute;
  } catch (error) {
    throw wrapAwsError("SERVICE", "GET-ATTRIBUTE-BY-ID", error);
  }
}
