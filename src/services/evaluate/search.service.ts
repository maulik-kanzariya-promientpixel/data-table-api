import {
  SearchDataTablesCommand,
  StringComparisonType,
} from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";

export default async function searchTable(
  operationType: "AND" | "OR",
  name?: string,
  description?: string,
  tags?: Record<string, string>,
) {
  const tables: any[] = [];
  let nextToken: string | undefined;

  try {
    const criteria: any[] = [];
    if (name) {
      criteria.push({
        StringCondition: {
          FieldName: "name",
          Value: name,
          ComparisonType: StringComparisonType.CONTAINS,
        },
      });
    }
    if (description) {
      criteria.push({
        StringCondition: {
          FieldName: "description",
          Value: description,
          ComparisonType: StringComparisonType.CONTAINS,
        },
      });
    }

    let SearchCriteria;
    if (criteria.length > 0) {
      SearchCriteria =
        operationType === "AND"
          ? { AndConditions: criteria }
          : { OrConditions: criteria };
    }

    let SearchFilter;
    if (tags && Object.keys(tags).length > 0) {
      const tagConditions = Object.entries(tags).map(([TagKey, TagValue]) => ({
        TagKey,
        TagValue,
      }));

      SearchFilter = {
        AttributeFilter: {
          AndCondition: {
            TagConditions: tagConditions,
          },
        },
      };
    }

    do {
      const command = new SearchDataTablesCommand({
        InstanceId: process.env.INSTANCE_ID!,
        ...(SearchCriteria && { SearchCriteria }),
        ...(SearchFilter && { SearchFilter }),
        NextToken: nextToken,
      });

      const response = await client.send(command);

      if (response.DataTables) {
        tables.push(...response.DataTables);
      }
      nextToken = response.NextToken;
    } while (nextToken);

    return tables;
  } catch (error) {
    throw wrapAwsError("SERVICE", "SEARCH-TABLE", error);
  }
}
