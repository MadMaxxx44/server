const User = require("../model/User");

const handleRed = async (req, res) => {
  const { red, username } = req.body;
  if (!red || !username)
    return res.status(400).json({ message: "Red and username is required." });
  try {
    const result = await User.findOneAndUpdate(
      { username },
      { $set: { red } },
      { new: true }
    );
    console.log(result);
    res
      .status(201)
      .json({ message: `Red updated for user ${username} (${red})` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRed = async (req, res) => {
  const { username } = req.params;
  if (!username)
    return res.status(400).json({ message: "Username is required." });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const redValue = user.red;
    res.status(200).json({ red: redValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRed, getRed };
