const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);
const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
