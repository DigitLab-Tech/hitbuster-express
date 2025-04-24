import sql from "../sql";
import { TableInterface } from "../TableInterface";

const contractsTable: TableInterface = {
  tableName: sql.unsafe("Contracts"),
} as const;

export default contractsTable;
