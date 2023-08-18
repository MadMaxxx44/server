const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  green: {
    type: Number,
    default: 0,
  },
  red: {
    type: Number,
    default: 0,
  },
  chart: {
    type: Array,
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  // dates: {
  //   type: Map,
  //   of: [
  //     {
  //       id: {
  //         type: String,
  //         required: true,
  //       },
  //       name: {
  //         type: String,
  //         required: true,
  //       },
  //       amount: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
