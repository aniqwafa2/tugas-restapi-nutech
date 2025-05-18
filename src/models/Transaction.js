const db = require("../config/db");

class Transaction {
  static async create(data, userId) {
    const {
      invoice_number,
      service_code,
      service_name,
      transaction_type,
      total_amount,
    } = data;
    return db.execute(
      "INSERT INTO transactions (user_id, invoice_number, service_code, service_name, transaction_type, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userId,
        invoice_number,
        service_code,
        service_name,
        transaction_type,
        total_amount,
      ]
    );
  }

  static async updateInvoiceCode(transactionId, invoiceCode) {
    return db.execute(
      "UPDATE transactions SET invoice_number = ? WHERE id = ?",
      [invoiceCode, transactionId]
    );
  }

  static async getTransactionById(transactionId) {
    const [rows] = await db.execute("SELECT * FROM transactions WHERE id = ?", [
      transactionId,
    ]);
    return rows[0];
  }

  static async getHistory(offset = 0, limit = null, userId) {
    let query =
      "SELECT invoice_number, transaction_type, service_name as description, total_amount, created_at as created_on FROM transactions WHERE user_id = ? ORDER BY created_at DESC";

    if (limit !== null) {
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    } 
    return db.execute(query, [userId]);
  }
}

module.exports = Transaction;
