const mongoose = require("mongoose");
const Brewery = require("./models/brewery");

mongoose.connect("mongodb://localhost:27017/Yelp-Beer", (err) => {
  if (err) throw err;
  //   console.log("connected to MongoDB");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected");
}).on("error", console.error.bind(console, "Connection Error:"));

const breweries = [
  {
    name: "Spearhead Brewing Company",
    hasFood: false,
    description:
      "Spearhead Brewery is on a quest to blaze new trails and expand the domain of craft beer into new territory. We are Beer Without Boundaries.",
    location: "Kingston, ON",
  },
  {
    name: "Skeleton Park Brewery",
    hasFood: true,
    description: "Dedicated to crafting old-world ales and celebrating life.",
    location: "Kingston, ON",
  },
  {
    name: "Stone City Ales",
    hasFood: true,
    description:
      "We are a craft brewery, tap room, bottle shop and kitchen are nestled in the heart of downtown Kingston. Beer to-go, tap room and food 7/week.",
    location: "Kingston, ON",
  },
  {
    name: "Riverhead Brewing Company",
    hasFood: false,
    description:
      "ADVENTUROUSLY BREWED! Our craft is about the journey, not the destination.",
    location: "Kingston, ON",
  },
  {
    name: "Bellwoods Brewery",
    hasFood: true,
    description:
      "Limited seasonal dishes & a rotating selection of experimental beer in a small brewhouse with patio.",
    location: "Toronto, ON",
  },
  {
    name: "Northern Maverick Brewing Company",
    hasFood: true,
    description:
      "Expansive brewpub with a large patio serving a locally sourced menu of upscale comfort food.",
    location: "Toronto, ON",
  },
];

const seedDB = async () => {
  await Brewery.deleteMany({});
  await Brewery.insertMany(breweries);
};

seedDB();

