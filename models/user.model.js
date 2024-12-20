const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("user", userModel);
