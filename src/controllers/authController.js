const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const UserBalance = require("../models/UserBalance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create(email, hashedPassword);
    const newUser = await User.findByEmail(email);

    await UserProfile.createProfile(newUser.id, first_name, last_name);
    await UserBalance.createBalance(newUser.id);

    res.json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 103,
        message: "username atau password salah",
        data: null,
      });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ status: 0, message: "login sukses", data: { token: token } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};
