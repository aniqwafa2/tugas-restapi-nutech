const express = require("express");
const { validateRegister } = require("../middleware/validationMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { register, login } = require("../controllers/authController");
const informationController = require("../controllers/informationController");
const transactionController = require("../controllers/transactionController");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  getBalance,
} = require("../controllers/userController");

const router = express.Router();
router.post("/register", validateRegister, register);
router.post("/login", validateRegister, login);

router.get("/profile", authenticateUser, getProfile);
router.put("/profile/update", authenticateUser, updateProfile);
router.put(
  "/profile/image",
  authenticateUser,
  upload.single("file"),
  uploadProfileImage
);

router.get("/banner", informationController.getAllBanners);
router.get("/services", authenticateUser, informationController.getAllServices);
router.get("/balance", authenticateUser, getBalance);
router.post("/topup",authenticateUser, transactionController.topupBalance);
router.post("/transaction", authenticateUser, transactionController.buy);
router.get("/transaction/history", authenticateUser, transactionController.history);

module.exports = router;
