const express = require("express");
const router = express.Router();
const contactModel = require("../models/contactModel");

// POST request to create a new star
router.post("/", async (req, res) => {
  try {
    const {
      phone,
      mail,
      adress,
      instagram,
      facebook,
      twitter,
      googlemap,
      footerDetail,
    } = req.body;

    const newContactModel = new contactModel({
      phone,
      mail,
      adress,
      instagram,
      facebook,
      twitter,
      googlemap,
      footerDetail,
    });

    await newContactModel.save();
    res.status(201).json(newContactModel);
  } catch (error) {
    console.error("Error creating new star:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET request to fetch all stars
router.get("/", async (req, res) => {
  try {
    const contact = await contactModel.find();
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching Contact:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT request to update an existing star
router.put("/", async (req, res) => {
  try {
    const {
      phone,
      mail,
      adress,
      instagram,
      facebook,
      twitter,
      googlemap,
      footerDetail,
    } = req.body;

    const updatedContact = await contactModel.findByIdAndUpdate(
      req.body.id, // ensure id is passed in the request body
      {
        phone,
        mail,
        adress,
        instagram,
        facebook,
        twitter,
        googlemap,
        footerDetail,
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contactt not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
