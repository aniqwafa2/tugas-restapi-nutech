const db = require("../config/db");

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }


    static async create(email, password) {
        await db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
    }
}

module.exports = User;
