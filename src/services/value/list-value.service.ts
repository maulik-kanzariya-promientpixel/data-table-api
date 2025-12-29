import { ListDataTableValuesCommand } from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

interface IPrimaryValueFilter {
  AttributeName: string;
  Values: string[];
}

export default async function listValues(
  instanceId: string,
  tableId: string,
  recordIds?: string[],
  primaryValue?: IPrimaryValueFilter[]
) {
  let nextToken: string | undefined;
  let values = [];
  try {
    do {
      const command = new ListDataTableValuesCommand({
        InstanceId: instanceId,
        DataTableId: tableId,
        NextToken: nextToken,
        RecordIds: recordIds,
        PrimaryAttributeValues: primaryValue,
      });

      const response = await client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [LIST-VALUES]");
        err.cause = response.$metadata;
        throw err;
      }

      if (response.Values) {
        values.push(...response.Values);
      }
      nextToken = response.NextToken;
    } while (nextToken);
    return values;
  } catch (error) {
    throw wrapAwsError("SERVICE", "LIST-VALUES", error);
  }
}
