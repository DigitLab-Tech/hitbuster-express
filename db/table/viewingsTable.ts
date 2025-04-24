import sql from "../sql";
import { TableInterface } from "../TableInterface";

const viewingsTable: TableInterface = {
  tableName: sql.unsafe("Viewings"),
} as const;

export default viewingsTable;
