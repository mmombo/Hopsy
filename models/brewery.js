const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrewerySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hasFood: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
  },
});

const Brewery = mongoose.model("Brewery", BrewerySchema);
module.exports = Brewery;
