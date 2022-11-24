const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const multer = require("multer");
const { MAX_FILE_SIZE } = require("../utils/constant");
const { UPLOAD_DEST } = process.env;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DEST);
  },

  filename: (req, file, cb) => {
    var fileObj = {
      "image/jpeg": ".jpeg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileObj[file.mimetype]);
  },
});

const fileFilter = (req, file, cb) => {
  let typeList = ["image/jpeg", "image/png", "image/webp"];

  if (typeList.includes(file.mimetype)) {
    console.log("here");
    return cb(null, true);
  }

  req.fileError = "Wrong File Type";
  return cb(null, false);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = { upload };
