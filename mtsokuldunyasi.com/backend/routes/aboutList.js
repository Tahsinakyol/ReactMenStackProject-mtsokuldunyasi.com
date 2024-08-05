const express = require("express");
const router = express.Router();
const AboutList = require("../models/aboutListModel");

router.post("/", async (req, res) => {
  try {
    const { name, detail } = req.body;

    const newAboutList = new AboutList({ name, detail });
    await newAboutList.save();
    res.status(201).json(newAboutList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const AboutList_all = await AboutList.find();
    res.status(200).json(AboutList_all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:aboutListId", async (req, res) => {
  try {
    const aboutListId = req.params.aboutListId;
    const AboutList = await News.findById(aboutListId);
    res.status(200).json(AboutList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:aboutListId", async (req, res) => {
  try {
    const aboutListId = req.params.aboutListId;
    const updates = req.body;

    const existingAboutList = await AboutList.findById(aboutListId);
    if (!existingAboutList) {
      return res.status(404).json({ error: "About List Not found" });
    }
    const updatedAboutList = await AboutList.findByIdAndUpdate(
      aboutListId,
      updates,
      {
        new: true,
      }
    );
    res.status(200).json(updatedAboutList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:aboutListId", async (req, res) => {
  try {
    const aboutListId = req.params.aboutListId;
    const deletedAboutList = await AboutList.findByIdAndDelete(aboutListId);
    if (!deletedAboutList) {
      return res.status(404).json({ error: "AboutList Not found" });
    }
    res.status(200).json(deletedAboutList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
