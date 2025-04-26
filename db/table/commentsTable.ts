import sql from "../sql";
import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";
import usersTable from "./usersTable";

export interface CommentsTableInterface extends TableInterface {
  deleteComment: (id: string) => Promise<Record<string, any>[]>;
  getAll: () => Promise<Record<string, any>[]>;
  updateRating: (id: string, rating: string) => Promise<Record<string, any>[]>;
}

const commentsTable: CommentsTableInterface = {
  tableName: sql.unsafe("Comments"),

  async deleteComment(id) {
    return await sql`DELETE FROM ${this.tableName} WHERE id = ${sql.unsafe(id)};`;
  },

  async updateRating(id, rating) {
    return await sql`UPDATE ${this.tableName}
      SET rating = ${sql.unsafe(rating)} 
      WHERE id = ${sql.unsafe(id)};`;
  },

  async getAll() {
    const tableName = this.tableName;
    const usersTableName = usersTable.tableName;
    const moviesTableName = moviesTable.tableName;

    return await sql`SELECT ${tableName}.id, ${usersTableName}.email as user_email, ${moviesTableName}.name as movie_name, ${tableName}.rating FROM ${tableName}
    INNER JOIN ${moviesTableName} ON ${tableName}.movie_id = ${moviesTableName}.id
    INNER JOIN ${usersTableName} ON ${tableName}.user_id = ${usersTableName}.id
    ORDER BY ${usersTableName}.id`;
  },
} as const;

export default commentsTable;
