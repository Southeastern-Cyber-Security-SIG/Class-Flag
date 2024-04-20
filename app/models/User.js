const dbSingleton = require("../../config/db.js"); // Import MySQL Singleton instance

class User {
  async authenticate(username, password) {
    try {
      const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      const users = await dbSingleton.query(sql);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw error;
    }
  }

  async createUser(username, password) {
    try {
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
      const values = [username, password];
      await dbSingleton.query(sql, values);
      console.log("User created successfully.");
    } catch (error) {
      throw error;
    }
  }

  async findOne(username) {
    try {
      const sql = "SELECT * FROM users WHERE username = ?";
      const values = [username];
      console.log("SQL Query:", sql, values);
      const users = await dbSingleton.query(sql, values);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error("Error in findOne:", error);
      throw error;
    }
  }
}

module.exports = new User();
