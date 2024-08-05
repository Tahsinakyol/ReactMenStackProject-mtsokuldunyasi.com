const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  header: { type: String, required: true },
  img: { type: String, required: false },
  secondHeader: { type: String, required: true },
  detail: { type: String, required: true },
});

module.exports = mongoose.model("About", aboutSchema);
