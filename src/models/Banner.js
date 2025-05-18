const db = require("../config/db");

class Banner {
    static async getAllBanners() {
        const [rows] = await db.execute("SELECT * FROM banners");
        return rows;
    }
}

module.exports = Banner;