const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!file) {
        return cb(new Error("Image reuired"), false);
    }
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Format Image tidak sesuai"), false);
    }
    cb(null, true);

};

const upload = multer({ storage, fileFilter });

module.exports = upload ;
