import pool from './pool';

export default {
    /**
     * Generic helper function for querying the database
     * @param queryText 
     * @param params 
     * @returns 
     */
  query(queryText: string, params?: string[]): Promise<object> {
    return new Promise((resolve, reject) => {
      pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};