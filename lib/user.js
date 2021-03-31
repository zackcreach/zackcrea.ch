import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = [];

export async function createUser({ email, password }, client) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    email,
    hash,
    salt,
  };

  const query = {
    text:
      "INSERT INTO users (id, created_at, email, hash, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: Object.values(user),
  };

  const { rows } = await client.query(query.text, query.values);

  return rows[0];
}

export async function findUser({ email }, client) {
  try {
    const query = {
      text: "SELECT * FROM users WHERE email=$1",
      values: [email],
    };

    const { rows } = await client.query(query.text, query.values);

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
