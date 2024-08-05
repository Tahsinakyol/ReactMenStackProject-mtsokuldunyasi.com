const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  mail: { type: String, required: true },
  adress: { type: String, required: true },
  instagram: { type: String, required: false },
  facebook: { type: String, required: false },
  twitter: { type: String, required: false },
  googlemap: { type: String, required: true },
  footerDetail: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
