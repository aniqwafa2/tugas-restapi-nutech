const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Paramter email tidak sesuai format")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password harus minimal 8 karakter"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 102, message: errors.array()[0].msg, data: null });
    }
    next();
  },
];
