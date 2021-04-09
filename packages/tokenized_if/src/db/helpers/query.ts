import { QueryResult } from 'pg';
import pool from './pool';

    /**
     * Generic helper function for querying the database
     * @param queryText 
     * @param params 
     * @returns 
     */
  export const query = function (queryText: string, params?: any[]): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
      pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const queryValue = async function (key: string): Promise<string> {
    var { rows } = await query("SELECT value from keyvalue where key = $1", [key]);
    if (rows.length > 0) {
      return rows[0].value;
    }
  };

  export const setKey = async function (key: string, value: string): Promise<void> {
    await query("INSERT INTO keyvalue(key, value) VALUES($1, $2)", [key, value]);
  }