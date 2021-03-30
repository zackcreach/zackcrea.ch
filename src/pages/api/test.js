import { client } from "../../../lib/database";

export default async function handler(req, res) {
  client.connect();

  const users = await client.query(`SELECT * FROM gifs`, []);

  res.status(200).json(users);
}
