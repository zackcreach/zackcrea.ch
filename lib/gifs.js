import { v4 as uuidv4 } from "uuid";

/**
 * @param {Object} params
 * @param {Function} db
 * @returns {Object}
 */
export async function addGif({ file, url, tags }, db) {
  const data = {
    id: uuidv4(),
    url,
    tags,
    created_ts: new Date().toISOString(),
    updated_ts: new Date().toISOString(),
  };

  const query = {
    text:
      "INSERT INTO gifs (id, created_at, email, hash, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: Object.values(data),
  };

  const { rows } = await db.query(query.text, query.values);

  return rows[0];
}
