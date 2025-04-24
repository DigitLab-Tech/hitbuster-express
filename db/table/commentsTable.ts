import sql from "../sql";
import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";
import usersTable from "./usersTable";

export interface CommentsTableInterface extends TableInterface {
  deleteComment: (
    userEmail: string,
    movieName: string
  ) => Promise<Record<string, any>[]>;
  getAll: () => Promise<Record<string, any>[]>;
}

const commentsTable: CommentsTableInterface = {
  tableName: sql.unsafe("Comments"),

  async deleteComment(userEmail: string, movieName: string) {
    const tableName = this.tableName;
    const usersTableName = usersTable.tableName;
    const moviesTableName = moviesTable.tableName;

    return await sql`DELETE FROM ${tableName}
      USING ${usersTableName}, ${moviesTableName}
      WHERE ${tableName}.movie_id = ${moviesTableName}.id 
      AND ${tableName}.user_id = ${usersTableName}.id 
      AND ${usersTableName}.email = '${sql.unsafe(userEmail)}' 
      AND ${moviesTableName}.name = '${sql.unsafe(movieName)}'; `;
  },

  async getAll() {
    const tableName = this.tableName;
    const usersTableName = usersTable.tableName;
    const moviesTableName = moviesTable.tableName;

    return await sql`SELECT ${usersTableName}.id, ${usersTableName}.email as user_email, ${moviesTableName}.name as movie_name, ${tableName}.rating FROM ${tableName}
    INNER JOIN ${moviesTableName} ON ${tableName}.movie_id = ${moviesTableName}.id
    INNER JOIN ${usersTableName} ON ${tableName}.user_id = ${usersTableName}.id
    ORDER BY ${usersTableName}.id`;
  },
} as const;

export default commentsTable;
