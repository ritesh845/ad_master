const path = require("path");
const fs = require('fs');
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({

  destination: function (req, file, callback) {
    // console.log(file.fieldname);
    if (!fs.existsSync('./poster/')) {
      fs.mkdirSync('./poster/');
    }
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
      if (!fs.existsSync('./poster/images')) {
        fs.mkdirSync('./poster/images');
      }
      callback(null, './poster/images/');
    } else if (file.mimetype === 'video/mp4') {
      if (!fs.existsSync('./poster/videos')) {
        fs.mkdirSync('./poster/videos');
      }
      callback(null, './poster/videos/');
    } else {
      callback(null, false);
    }
  },
  filename: function (req, file, callback) {
    let ext = path.extname(file.originalname).toLowerCase();
    callback(null, Date.now() + ext);
  }
});

var fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif' || file.mimetype === 'video/mp4') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});


// let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = upload;