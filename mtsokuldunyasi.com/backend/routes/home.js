const express = require("express");
const router = express.Router();
const homeModel = require("../models/homeModel");
router.post("/", async (req, res) => {
  try {
    const {
      header,
      secondHeader,
      secondDetail,
      secondBottom,
      name,
      img,
      detail,
    } = req.body;

    const newHome = new homeModel({
      header,
      secondHeader,
      secondDetail,
      secondBottom,
      name,
      img,
      detail,
    });
    await newHome.save();
    res.status(201).json(newHome);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const homes = await homeModel.find();
    res.status(200).json(homes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
// PUT request to update an existing home
router.put("/", async (req, res) => {
  try {
    const { header, secondHeader, secondDetail, secondBottom, img, detail } =
      req.body;

    // Burada güncellenen evi bulmak için bir arama kriteri belirtmek gerekebilir. Örneğin, isme göre arama yapılabilir.
    // Bu örnek kodda böyle bir arama kriteri belirtilmemiş, bu nedenle tüm evler güncelleniyor.
    const updatedHomes = await homeModel.updateMany(
      {},
      { header, secondHeader, secondDetail, secondBottom, img, detail }
    );

    // Eğer güncelleme işlemi başarılı olduysa, güncellenen evlerin listesini döndür
    res.status(200).json(updatedHomes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
