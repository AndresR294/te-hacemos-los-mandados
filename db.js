import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ledl",
  password: "3l1z@T34m0M@$", // deja vacío si no usas password
  port: 5432,
});

export default pool;
