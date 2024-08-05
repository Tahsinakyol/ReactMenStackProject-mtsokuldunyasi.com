const mongoose = require("mongoose");

const HomeSchema = mongoose.Schema(
  {
    header: { type: String, required: true },
    secondHeader: { type: String, required: true },
    secondDetail: { type: String, required: true },
    secondBottom: { type: String, required: true },
  },
  { timestamps: true }
);
const Home = mongoose.model("Home", HomeSchema);
module.exports = Home;
