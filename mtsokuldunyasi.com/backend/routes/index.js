const express = require("express");
const router = express.Router();

// Import route files
const newsRoute = require("./allnews.js");
const userRoute = require("./auth.js");
const homeRoute = require("./home.js");
const starRoute = require("./star.js");
const aboutRoute = require("./about.js");
const brandRoute = require("./brand.js");
const aboutListRoute = require("./aboutList.js");
const contactRoute = require("./contact.js");

// Use route paths
router.use("/allnews", newsRoute);
router.use("/auth", userRoute);
router.use("/home", homeRoute);
router.use("/star", starRoute);
router.use("/about", aboutRoute);
router.use("/brand", brandRoute);
router.use("/aboutList", aboutListRoute);
router.use("/contact", contactRoute);

module.exports = router;
