const mongoose = require("mongoose");
const Review = require("./review");
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
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

BrewerySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

const Brewery = mongoose.model("Brewery", BrewerySchema);
module.exports = Brewery;
