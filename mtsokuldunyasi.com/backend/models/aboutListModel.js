const mongoose = require("mongoose");

const AboutListSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { timestamps: true }
);
const AboutList = mongoose.model("AboutList", AboutListSchema);
module.exports = AboutList;
