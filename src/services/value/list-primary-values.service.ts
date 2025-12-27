import { ListDataTablePrimaryValuesCommand } from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

interface IprimaryValue {
  AttributeName: string;
  Values: string[];
}

export default async function listTablePrimaryValue(
  tableId: string,
  recordIds?: string[],
  primaryValue?: IprimaryValue[]
) {
  const values = [];
  let nextToken: string | undefined;

  try {
    do {
      const command = new ListDataTablePrimaryValuesCommand({
        InstanceId: process.env.INSTANCE_ID,
        DataTableId: tableId,
        PrimaryAttributeValues: primaryValue,
        RecordIds: recordIds,
        NextToken: nextToken,
      });

      const response = await client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [LIST-VALUES]");
        err.cause = response.$metadata;
        throw err;
      }

      if (response.PrimaryValuesList) {
        values.push(...response.PrimaryValuesList);
      }
      nextToken = response.NextToken;
    } while (nextToken);
    return values;
  } catch (error) {
    throw wrapAwsError("SERVICE", "LIST-PRIMARY-VALUES", error);
  }
}
