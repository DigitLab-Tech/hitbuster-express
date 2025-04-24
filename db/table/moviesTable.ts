import sql from "../sql";
import { TableInterface } from "../TableInterface";
import categoriesTable from "./categoriesTable";
import moviesCategoriesTable from "./moviesCategoriesTable";
import viewingsTable from "./viewingsTable";

export interface MoviesTableInterface extends TableInterface {
  getNeverViewedMovies: () => Promise<Record<string, any>[]>;
  getActionMovies: () => Promise<Record<string, any>[]>;
}

const moviesTable: MoviesTableInterface = {
  tableName: sql.unsafe("Movies"),

  async getNeverViewedMovies() {
    return await sql`SELECT name FROM ${this.tableName}
      WHERE id NOT IN(SELECT movie_id FROM ${viewingsTable.tableName})`;
  },

  async getActionMovies() {
    const tableName = this.tableName;
    const moviesCategoriesTableName = moviesCategoriesTable.tableName;
    const categoriesTableName = categoriesTable.tableName;

    return await sql`SELECT ${tableName}.name, rating FROM ${tableName}
      INNER JOIN ${moviesCategoriesTableName} ON ${tableName}.id = ${moviesCategoriesTableName}.movie_id
      INNER JOIN ${categoriesTableName} ON ${moviesCategoriesTableName}.category_id = ${categoriesTableName}.id
      WHERE ${categoriesTableName}.name = 'Action'; `;
  },
} as const

export default moviesTable;
