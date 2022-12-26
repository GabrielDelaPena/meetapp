const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    phone: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);