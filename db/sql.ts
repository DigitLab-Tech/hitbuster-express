import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export const sql = (() => {
    if (!_sql) {
        _sql = neon(`${process.env.NEON_DATABASE_URL}`);
    }

    return _sql
})();

export default sql;