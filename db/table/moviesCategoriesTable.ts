import { TableInterface } from "../TableInterface";
import sql from "../sql";

const moviesCategoriesTable: TableInterface = {
  tableName: sql.unsafe("Movies_Categories"),
} as const;

export default moviesCategoriesTable;
