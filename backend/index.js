require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/note.model");

const app = express();

mongoose.connect(config.connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/", (_req, res) => {
  res.json({ data: "hello" });
});

// 🔐 Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required." });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({ error: true, message: "User already exists." });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// 🔑 Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required." });
  }

  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found." });
  }

  if (userInfo.password === password) {
    const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({ error: true, message: "Invalid Credentials." });
  }
});

// ✅ GET USER
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findById(user._id);
  if (!isUser) return res.sendStatus(401);

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// ✅ GET ALL NOTES
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({ error: false, notes, message: "All Notes retrieved!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// ✅ ADD NOTE
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({ error: true, message: "Title and content are required." });
  }

  try {
    const note = new Note({
      title,
      content,
      tags,
      userId: user._id,
    });

    await note.save();

    return res.json({ error: false, note, message: "Note Added!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Failed to add note." });
  }
});

// ✅ EDIT NOTE
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { title, content, tags },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: true, message: "Note not found." });

    return res.json({ error: false, note, message: "Note Updated!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Failed to update note." });
  }
});

// ✅ DELETE NOTE
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found." });

    return res.json({ error: false, note, message: "Note Deleted!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Failed to delete note." });
  }
});

// ✅ UPDATE PINNED
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { isPinned },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: true, message: "Note not found." });

    return res.json({ error: false, note, message: "Pinned status updated!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Failed to update pinned status." });
  }
});

// ✅ SEARCH NOTES
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { q } = req.query;
  const { user } = req.user;

  try {
    const regex = new RegExp(q, "i");

    const notes = await Note.find({
      userId: user._id,
      $or: [
        { title: regex },
        { content: regex },
        { tags: { $elemMatch: { $regex: regex } } },
      ],
    });

    return res.json({ error: false, notes, message: "Search complete!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Failed to search notes." });
  }
});

// ✅ Start Server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

module.exports = app;
