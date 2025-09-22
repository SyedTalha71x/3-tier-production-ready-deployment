import mysql from "mysql2";
import { configDotenv } from "dotenv";


configDotenv();
let pool;
function connectToDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    pool.on("connection", (connection) => {
      console.log(
        "Database connected with connection ID ",
        connection.threadId
      );
    });

    pool.on("error", (error) => {
      console.log("Error connecting with a database", error);
    });
    // console.log("Database connection pool created !!!!!!");
  }
  return pool;
}

export { connectToDB };
