const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLM = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//passport adds username and password fields to model
UserSchema.plugin(passportLM);

module.exports = mongoose.model("User", UserSchema);
