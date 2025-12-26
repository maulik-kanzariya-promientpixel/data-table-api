import {
  type DataTableAttributeValueType,
  UpdateDataTableAttributeCommand,
  type Validation,
} from "@aws-sdk/client-connect";
import { wrapAwsError } from "../../utils/error.helper.js";
import client from "../../config/connect-client.js";

export default async function updateTableAttribute(
  tableId: string,
  oldName: string,
  valueType: DataTableAttributeValueType,
  {
    newName,
    description,
    primary,
    validation,
  }: {
    newName?: string;
    description?: string;
    primary?: boolean;
    validation?: Validation;
  },
) {
  try {
    const instanceId = process.env.INSTANCE_ID;
    if (!instanceId) {
      throw new Error("INSTANCE_ID is not configured");
    }

    const command = new UpdateDataTableAttributeCommand({
      InstanceId: instanceId,
      DataTableId: tableId,
      AttributeName: oldName,
      Name: newName ?? oldName,
      ValueType: valueType,
      Description: description,
      Primary: primary,
      Validation: validation,
    });

    const response = await client.send(command);

    return response.LockVersion;
  } catch (error) {
    throw wrapAwsError("SERVICE", "UPDATE-ATTRIBUTE", error);
  }
}
