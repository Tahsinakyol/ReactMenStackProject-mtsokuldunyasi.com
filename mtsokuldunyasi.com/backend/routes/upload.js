const multer = require("multer");

// Depolama motorunu ayarla
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // bu klasörün var olduğundan emin olun
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
