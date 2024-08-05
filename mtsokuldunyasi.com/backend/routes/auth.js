const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

// Kullanıcı Olusturma (Create)
router.post("/register", async (req, res) => {
  try {
    const { username, email, name, surname, password, role, avatar } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      name,
      surname,
      password: hashedPassword,
      role,
      avatar,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// kullanıcı girişi login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      surname: user.surname,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// kullanıcı silme start
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
// Tüm kullanıcıları listeleme start
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
// Id ye Göre Kullanıcı Listeleme start
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
