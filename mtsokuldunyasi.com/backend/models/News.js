const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { timestamps: true }
);
const News = mongoose.model("News", NewsSchema);
module.exports = News;
