const express = require("express");
const router = express.Router();
const multer = require("multer");
const News = require("../models/News");

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
    const { name, detail } = req.body;
    const img = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";
    const newNews = new News({ name, img, detail });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const News_all = await News.find();
    res.status(200).json(News_all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:newsId", async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// router.put("/:newsId", async (req, res) => {
//   try {
//     const newsId = req.params.newsId;
//     const updates = req.body;
//     const existingNews = await News.findById(newsId);
//     if (!existingNews) {
//       return res.status(404).json({ error: "News Not found" });
//     }
//     const updatedNew = await News.findByIdAndUpdate(newsId, updates, {
//       new: true,
//     });
//     res.status(200).json(updatedNew);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });
router.put("/:newsId", upload.single("img"), async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const updates = req.body;
    if (req.file) {
      updates.img = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const existingNews = await News.findById(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: "News Not found" });
    }
    const updatedNews = await News.findByIdAndUpdate(newsId, updates, {
      new: true,
    });
    res.status(200).json(updatedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:newsId", async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.status(404).json({ error: "News Not found" });
    }
    res.status(200).json(deletedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
