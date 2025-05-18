const db = require("../config/db");

class UserProfile {
  static async createProfile(userId, firstName, lastName) {
    await db.execute(
      "INSERT INTO user_profiles (user_id, first_name, last_name) VALUES (?, ?, ?)",
      [userId, firstName, lastName]
    );
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      [userId]
    );
    return rows[0];
  }

  static async updateProfile(userId, firstName, lastName) {
    await db.execute(
      "UPDATE user_profiles SET first_name = ?, last_name= ? WHERE user_id = ?",
      [firstName, lastName, userId]
    );
  }

  static async udateProfileImage(userId, imagePath) {
    await db.execute("UPDATE user_profiles SET profile_image = ? WHERE id = ?", [
      imagePath,
      userId,
    ]);
  }
}

module.exports = UserProfile;
