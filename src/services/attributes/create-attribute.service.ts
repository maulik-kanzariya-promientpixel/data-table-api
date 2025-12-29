import {
  CreateDataTableAttributeCommand,
  type DataTableAttributeValueType,
  type Validation,
} from "@aws-sdk/client-connect";
import client from "../../config/connect-client.js";
import { wrapAwsError } from "../../utils/error.helper.js";

export default async function createTableAttribute(
  instanceId: string,
  DataTableId: string,
  name: string,
  valueType: DataTableAttributeValueType,
  description: string | undefined,
  primary: boolean | undefined,
  validation: Validation | undefined
) {
  try {
    const command = new CreateDataTableAttributeCommand({
      InstanceId: instanceId,
      DataTableId,
      Name: name,
      ValueType: valueType,
      Description: description,
      Primary: primary,
      Validation: validation,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      const err = new Error("Error occurred at: [SERVICE] [CREATE-ATTRIBUTE]");
      err.cause = response.$metadata;
      throw err;
    }

    return response;
  } catch (err) {
    throw wrapAwsError("SERVICE", "CREATE-ATTRIBUTE", err);
  }
}
