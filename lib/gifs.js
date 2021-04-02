import { v4 as uuidv4 } from "uuid";

/**
 * @param {Object} params
 * @param {Function} db
 * @returns {Object}
 */
export async function createGif(params, db) {
  const now = new Date().toISOString();

  const values = {
    id: uuidv4(),
    name: params.name,
    url: params.url,
    tags: params.tags,
    created_ts: now,
    updated_ts: now,
  };

  const query = {
    text:
      "INSERT INTO gifs (id, name, url, tags, created_ts, updated_ts) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    values: Object.values(values),
  };

  const { rows } = await db.query(query.text, query.values);

  return rows[0];
}

/**
 * @param {Function} db
 * @returns {Object}
 */
export async function getGifList(db) {
  const query = {
    text: "SELECT * FROM gifs",
    values: [],
  };

  const { rows } = await db.query(query.text, query.values);

  return rows[0];
}

/**
 * @param {String} params
 * @param {Function} db
 * @returns {Object}
 */
export async function getGif(params, db) {
  const values = {
    id: params.id,
  };

  const query = {
    text: "SELECT * FROM gifs WHERE id = $1",
    values: Object.values(values),
  };

  const { rows } = await db.query(query.text, query.values);

  return rows[0];
}
