import {
  ListDataTablesCommand,
  type DataTableSummary,
} from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";

const InstanceId = process.env.INSTANCE_ID;

if (!InstanceId) {
  throw new Error("INSTANCE_ID environment variable is missing");
}

export default async function listTables() {
  try {
    let nextToken: string | undefined;
    let tableList: DataTableSummary[] = [];

    do {
      const command = new ListDataTablesCommand({
        InstanceId,
        NextToken: nextToken,
      });
      const response = await client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        const err = new Error("Error occurred at: [SERVICE] [LIST-TABLE]");
        err.cause = response.$metadata;
        throw err;
      }

      nextToken = response.NextToken;
      if (response.DataTableSummaryList) {
        tableList.push(...response.DataTableSummaryList);
      }
    } while (nextToken);
    return tableList;
  } catch (err) {
    throw wrapAwsError("SERVICE", "LIST-TABLE", err);
  }
}
