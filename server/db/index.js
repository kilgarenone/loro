require("dotenv").config();

const { Pool } = require("pg");

const config = {
  user: process.env.POSTGRES_USER, //this is the db user credential
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("❤️ Connected to the Database ❤️");
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
