import sql from "../sql";
import { TableInterface } from "../TableInterface";

const castingsTable: TableInterface = {
  tableName: sql.unsafe("Castings"),
} as const;

export default castingsTable;
