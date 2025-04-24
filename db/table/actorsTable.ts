import sql from "../sql";
import { TableInterface } from "../TableInterface";
import castingsTable from "./castingsTable";
import moviesTable from "./moviesTable";

export interface ActorsTablesInterface extends TableInterface {
  getBestMovieActors: () => Promise<Record<string, any>[]>;
}

const actorsTable: ActorsTablesInterface = {
  tableName: sql.unsafe("Actors"),

  async getBestMovieActors() {
    const tableName = this.tableName;
    const moviesTableName = moviesTable.tableName;
    const castingsTableName = castingsTable.tableName;

    return await sql`SELECT firstname, lastname, ${moviesTableName}.name as movie_name, ${moviesTableName}.rating as movie_rating FROM ${tableName}
      INNER JOIN ${castingsTableName} ON ${tableName}.id = ${castingsTableName}.actor_id
      INNER JOIN ${moviesTableName} ON ${castingsTableName}.movie_id = ${moviesTableName}.id
      WHERE ${castingsTableName}.movie_id = (SELECT id FROM ${moviesTableName} ORDER BY rating DESC LIMIT 1)`;
  },
} as const;

export default actorsTable;
