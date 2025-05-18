const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error koneksi ke database:", err.message);
        process.exit(1);
    }
    console.log("Koneksi ke database berhasil");
    connection.release();
});

module.exports = pool.promise();