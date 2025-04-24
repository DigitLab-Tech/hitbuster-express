import sql from "../sql";
import { TableInterface } from "../TableInterface";
import viewingsTable from "./viewingsTable";

export interface UsersTableInterface extends TableInterface {
  getBestViewer: () => Promise<Record<string, any>[]>;
  getAll: () => Promise<Record<string, any>[]>;
}

const usersTable: UsersTableInterface = {
  tableName: sql.unsafe("Users"),

  async getBestViewer() {
    const tableName = this.tableName;
    const viewingTableName = viewingsTable.tableName;

    return await await sql`SELECT firstname, lastname, COUNT(${viewingTableName}.id) as view_count
    FROM ${tableName}
    INNER JOIN ${viewingTableName} ON ${tableName}.id = ${viewingTableName}.user_id 
    GROUP BY ${tableName}.id
    ORDER BY view_count DESC
    LIMIT 1;`;
  },

  async getAll() {
    return await sql`SELECT id, firstname, lastname FROM users
    ORDER BY lastname`;
  },
} as const;

export default usersTable;
