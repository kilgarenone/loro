const { Pool } = require("pg");

const config = {
  user: "ahwei", //this is the db user credential
  database: "lorodb",
  password: "kornfor1988",
  port: 3000,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);
pool.on("connect", () => {
  console.log("connected to the Database");
});
module.exports = {
  query: (text, params) => pool.query(text, params)
};
