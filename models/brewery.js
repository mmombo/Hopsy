const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumb").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const BrewerySchema = new Schema({
  images: [ImageSchema],
  name: {
    type: String,
    required: true,
    unique: true,
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

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
