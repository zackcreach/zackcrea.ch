import { Client } from "pg";

// Client looks for PG* configuration variables in process.env
export const db = new Client();
