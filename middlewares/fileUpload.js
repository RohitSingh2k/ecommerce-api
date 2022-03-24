const multer = require("multer");

const storage = multer.diskStorage({
  // Specify destination location.
  destination : 'public/products',

  // Format file name.
  filename: function (req, file, cb) {
    file.modifiedName = `${Date.now()}-${file.originalname}`;
    file.fileUrl =`/products/${file.modifiedName}`;
    cb(null, file.modifiedName);
  },

  // TODO: Adding filter for a specific file-type.
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"),false);
    } else {
        callback(null, true);
    }
  },

  // Added limit of the file to 1MB.
  limits: {
    fileSize: 1024 * 1024,
  },
});

const upload = multer({ storage });

module.exports = upload;
