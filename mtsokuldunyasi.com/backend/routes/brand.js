const express = require("express");
const router = express.Router();
const multer = require("multer");
const Brand = require("../models/brandModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { name } = req.body;
    const img = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";
    const newBrand = new Brand({ name, img });
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Brand_all = await Brand.find();
    res.status(200).json(Brand_all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:brandId", async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const brand = await News.findById(brandId);
    res.status(200).json(brand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:brandId", upload.single("img"), async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const updates = req.body;
    if (req.file) {
      updates.img = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const existingBrand = await News.findById(brandId);
    if (!existingBrand) {
      return res.status(404).json({ error: "Brand Not found" });
    }
    const updatedBrand = await News.findByIdAndUpdate(brandId, updates, {
      new: true,
    });
    res.status(200).json(updatedBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:brandId", async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const deletedBrand = await Brand.findByIdAndDelete(brandId);
    if (!deletedBrand) {
      return res.status(404).json({ error: "Brand Not found" });
    }
    res.status(200).json(deletedBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
