const express = require("express");
const router = express.Router();
const starModel = require("../models/starModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST request to create a new star
router.post("/", upload.single("img"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { header, secondHeader, detail } = req.body;
    if (!header || !secondHeader || !detail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const img = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const newStar = new starModel({
      header,
      img,
      secondHeader,
      detail,
    });

    await newStar.save();
    res.status(201).json(newStar);
  } catch (error) {
    console.error("Error creating new star:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET request to fetch all stars
router.get("/", async (req, res) => {
  try {
    const stars = await starModel.find();
    res.status(200).json(stars);
  } catch (error) {
    console.error("Error fetching stars:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT request to update an existing star
router.put("/", upload.single("img"), async (req, res) => {
  try {
    const { header, secondHeader, detail } = req.body;
    const img = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.img; // use existing image URL if not uploading a new one

    const updatedStar = await starModel.findByIdAndUpdate(
      req.body.id, // ensure id is passed in the request body
      {
        header,
        img,
        secondHeader,
        detail,
      },
      { new: true }
    );

    if (!updatedStar) {
      return res.status(404).json({ error: "Star not found" });
    }

    res.status(200).json(updatedStar);
  } catch (error) {
    console.error("Error updating star:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
