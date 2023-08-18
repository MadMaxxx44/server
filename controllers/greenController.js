const User = require("../model/User");

const handleGreen = async (req, res) => {
  const { green, username } = req.body;
  if (!green || !username)
    return res.status(400).json({ message: "Green and username is required." });
  try {
    const result = await User.findOneAndUpdate(
      { username },
      { $inc: { green } },
      { new: true }
    );
    console.log(result);
    res.status(201).json({ message: `Green updated for user ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGreen = async (req, res) => {
  const { username } = req.params;
  if (!username)
    return res.status(400).json({ message: "Username is required." });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const greenValue = user.green;
    res.status(200).json({ green: greenValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleGreen, getGreen };
