import { type DataTableLockLevel } from "@aws-sdk/client-connect";

interface ITable {
  name: string;
  timezone: string;
  description?: string;
  status?: "PUBLISHED";
  valueLockLevel?: DataTableLockLevel;
  tags?: Record<string, string>;
}

export { type ITable };

declare global {
  namespace Express {
    export interface Request {
      tableId: string;
    }
  }
}
