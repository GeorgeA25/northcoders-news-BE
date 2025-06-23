const ENV = process.env.NODE_ENV || "development";

const { Pool } = require("pg");

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });
console.log(process.env.DATABASE_URL);
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE OR DATABASE_URL not set");
} else {
  console.log(
    `Connected to ${process.env.PGDATABASE || "DATABASE_URL (remote)"}`
  );
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const db = new Pool(config);

module.exports = db;
