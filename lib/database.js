import { Client } from "pg";

// Client looks for PG* variables in process.env
export const client = new Client();
