import {
  EvaluateDataTableValuesCommand,
  type DataTableValueEvaluationSet,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export async function evaluteTable(
  tableId: string,
  timezone: string,
  values: DataTableValueEvaluationSet[],
) {
  try {
    let nextToken: string | undefined;
    const results: any[] = [];

    do {
      const command = new EvaluateDataTableValuesCommand({
        InstanceId: process.env.INSTANCE_ID,
        DataTableId: tableId,
        TimeZone: timezone,
        Values: values,
        NextToken: nextToken,
      });

      const response = await client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [EVALUATE-TABLE]");
        err.cause = response.$metadata;
        throw err;
      }

      if (response.Values) {
        results.push(...response.Values);
      }

      nextToken = response.NextToken;
    } while (nextToken);

    return results;
  } catch (error) {
    throw wrapAwsError("SERVICE", "EVALUATE-TABLE", error);
  }
}
