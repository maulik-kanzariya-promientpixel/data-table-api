import { wrapAwsError } from "../../utils/error.helper.js";

export async function evaluteTable(tableId: string) {
  try {
  
} catch (error) {
    throw wrapAwsError("SERVICE", "EVALUATE-TABLE", error);
  }
}
