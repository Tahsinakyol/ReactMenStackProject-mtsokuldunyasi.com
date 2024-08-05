const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const mainRoute = require("./routes/index.js");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb'ye bağlandı");
  } catch (error) {
    throw error;
  }
};

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create uploads folder if it doesn't exist
const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", mainRoute); // Ensure this line is correctly set

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
