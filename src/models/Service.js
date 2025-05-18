const db = require("../config/db");

class Service {
    static async getAllServices() {
        const [rows] = await db.execute("SELECT * FROM services");
        return rows;
    }

    static async getServiceByCode(service_code){
        const [rows] = await db.execute("SELECT * FROM services WHERE service_code = ?",[service_code]);
        return rows[0];
    }
}

module.exports = Service;