import sql from "../sql";
import { TableInterface } from "../TableInterface";

const addressesTable: TableInterface = {
  tableName: sql.unsafe("Addresses"),
} as const;

export default addressesTable;
