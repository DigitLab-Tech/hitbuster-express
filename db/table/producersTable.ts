import sql from "../sql";
import { TableInterface } from "../TableInterface";

const producersTable: TableInterface = {
  tableName: sql.unsafe("Producers"),
} as const;

export default producersTable;
