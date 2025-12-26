import {
  ListDataTableAttributesCommand,
  type DataTableAttribute,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function listTableAttributes(tableId: string) {
  try {
    let nextToken: string | undefined;
    const attributes: DataTableAttribute[] = [];
    do {
      const command = new ListDataTableAttributesCommand({
        InstanceId: process.env.INSTANCE_ID,
        DataTableId: tableId,
        NextToken: nextToken,
      });

      const response = await client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [LIST-ATTRIBUTE]");
        err.cause = response.$metadata;
        throw err;
      }
      nextToken = response.NextToken;
      if (response.Attributes) {
        attributes.push(...response.Attributes);
      }
    } while (nextToken);
    return attributes;
  } catch (error) {
    throw wrapAwsError("SERVICE", "LIST-ATTRIBUTES", error);
  }
}
