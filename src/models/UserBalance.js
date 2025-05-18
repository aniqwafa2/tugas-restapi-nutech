const db = require("../config/db");

class UserBalance {
  static async createBalance(userId) {
    await db.execute(
      "INSERT INTO user_balances (user_id, balance) VALUES (?, ?)",
      [userId, 0]
    );
  }

  static async getBalance(userId) {
    const [rows] = await db.execute(
      "SELECT balance FROM user_balances WHERE user_id = ?",
      [userId]
    );
    return rows[0]?.balance || 0;
  }

  static async updateBalance(userId, amount, type) {
    if (type === "plus") {
      await db.execute(
        "UPDATE user_balances SET balance = balance + ? WHERE user_id = ?",
        [amount, userId]
      );
    } else {
      await db.execute(
        "UPDATE user_balances SET balance = balance - ? WHERE user_id = ?",
        [amount, userId]
      );
    }
  }
}

module.exports = UserBalance;
