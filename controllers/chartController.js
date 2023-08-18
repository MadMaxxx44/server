const User = require("../model/User");

const handleChart = async (req, res) => {
  const { chart, username } = req.body;
  if (!chart || !username)
    return res.status(400).json({ message: "Chart and username is required." });
  try {
    const result = await User.findOneAndUpdate(
      { username },
      { $set: { chart } },
      { new: true }
    );
    console.log(result);
    res.status(201).json({ message: `Chart updated for user ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChart = async (req, res) => {
  const { username } = req.params;
  if (!username)
    return res.status(400).json({ message: "Username is required." });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const chartValue = user.chart;
    res.status(200).json({ chart: chartValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getChart, handleChart };
