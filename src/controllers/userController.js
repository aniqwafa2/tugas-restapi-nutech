const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const UserBalance = require("../models/UserBalance");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserProfile.findByUserId(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const profileImageUrl = user.profileImage
      ? `${req.protocol}://${req.get("host")}/${user.profileImage}`
      : null;

    res.json({
      status: 0,
      message: "sukses",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: profileImageUrl,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { first_name, last_name } = req.body;
    await UserProfile.updateProfile(userId, first_name, last_name);
    res.json({ message: "Profil berhasil diperbarui!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file) {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }
    const imagePath = `uploads/${req.file.filename}`;
    await UserProfile.udateProfileImage(userId, imagePath);

    const userProfile = await UserProfile.findByUserId(userId);
    const userData = await User.findById(userId);

    const profileImageUrl = userProfile.profile_image
      ? `${req.protocol}://${req.get("host")}/${userProfile.profile_image}`
      : null;

    res.json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: {
        email: userData.email,
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        profile_image: profileImageUrl,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: "Format Image tidak sesuai",
      data: null,
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const balance = await UserBalance.getBalance(userId);
    res.json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: balance,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};


