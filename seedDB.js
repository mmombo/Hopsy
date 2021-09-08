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
    photoURL :"https://on.thegrowler.ca/wp-content/uploads/2019/08/glass-shot.jpeg"
  },
  {
    name: "Skeleton Park Brewery",
    hasFood: true,
    description: "Dedicated to crafting old-world ales and celebrating life.",
    location: "Kingston, ON",
    photoURL:"https://cdn.justwineapp.com/assets/producer/background/skeleton-park-brewery.jpg",
  },
  {
    name: "Stone City Ales",
    hasFood: true,
    description:
      "We are a craft brewery, tap room, bottle shop and kitchen are nestled in the heart of downtown Kingston. Beer to-go, tap room and food 7/week.",
    location: "Kingston, ON",
    photoURL:"https://i1.wp.com/www.sdhopaddict.com/wp-content/uploads/2017/10/Ontario-Breweries-26.jpg?fit=1024%2C608&ssl=1&w=640",
  },
  {
    name: "Riverhead Brewing Company",
    hasFood: false,
    description:
      "ADVENTUROUSLY BREWED! Our craft is about the journey, not the destination.",
    location: "Kingston, ON",
    photoURL:"https://lh5.googleusercontent.com/p/AF1QipN9Y6xRLaKssmKWFrznKe1Bg5JDYe7_G__WqADE",
  },
  {
    name: "Bellwoods Brewery",
    hasFood: true,
    description:
      "Limited seasonal dishes & a rotating selection of experimental beer in a small brewhouse with patio.",
    location: "Toronto, ON",
    photoURL:"https://cdn.shopify.com/s/files/1/0072/8449/0309/files/about_image1_980x.jpg?v=1543204157",
  },
  {
    name: "Northern Maverick Brewing Company",
    hasFood: true,
    description:
      "Expansive brewpub with a large patio serving a locally sourced menu of upscale comfort food.",
    location: "Toronto, ON",
    photoURL:"https://live.staticflickr.com/910/41062807424_d2c4bb2b60_b.jpg",
  },
];

const seedDB = async () => {
  await Brewery.deleteMany({});
  await Brewery.insertMany(breweries);
};

seedDB();

