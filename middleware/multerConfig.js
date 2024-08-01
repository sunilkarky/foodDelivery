const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //check the image/mimetype format
    const acceptedFileFormat = ["image/jpg", "image/png", "image/jpeg"];
    if (!acceptedFileFormat.includes(file.mimetype)) {
      cb(new Error("This file format is not supported"));
      return;
    }
    cb(null, "./uploads"); //root to destination path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = { multer, storage };
