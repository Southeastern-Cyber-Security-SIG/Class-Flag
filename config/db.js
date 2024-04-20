require("dotenv").config();
const mysql = require("mysql2/promise");

class MySQLSingleton {
  constructor() {
    if (!MySQLSingleton.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
      });
      MySQLSingleton.instance = this;
    }

    return MySQLSingleton.instance;
  }

  async query(sql, values) {
    const connection = await this.pool.getConnection();
    try {
      const [rows, fields] = await connection.query(sql, values);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async end() {
    await this.pool.end();
  }
}

const dbSingleton = new MySQLSingleton();
module.exports = dbSingleton;
