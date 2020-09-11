const express = require("express");
const router = express.Router();

const Profile = require("../../models/profile");
const authToken = require("../../middleware/authToken");

// @route GET /api/profile
// @desc Get a user profile
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["username", "email", "date"]);

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/profile
// @desc Create or update a user profile
// @access Private
router.post("/", authToken, async (req, res) => {
  const { theme, fillColor, visited } = req.body;

  if (!fillColor)
    return res.status(400).json({ msg: "Please provide a fill color" });

  const profileFields = {
    user: req.user.id,
    fillColor,
    visited,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = await profileFields.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/profile/:_id/visited
// @desc Update a user visited states
// @access Private
router.post("/:_id/visited", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params._id,
      { visited: req.body.visited },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/profile/:_id/fill
// @desc Update a user visited states
// @access Private
router.post("/:_id/fill", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params._id,
      { fillColor: req.body.fillColor },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
