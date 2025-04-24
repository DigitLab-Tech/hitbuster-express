import sql from "../sql";
import { TableInterface } from "../TableInterface";

const categoriesTable: TableInterface = {
  tableName: sql.unsafe("Categories"),
} as const;

export default categoriesTable;
