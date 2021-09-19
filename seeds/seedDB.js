const mongoose = require("mongoose");
const Brewery = require("../models/brewery");

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
    author: "61439e56bcfddb08d571dd4c",
    images: [
      {
        url: "https://on.thegrowler.ca/wp-content/uploads/2019/08/glass-shot.jpeg",
        filename: "placeholder1",
      },
    ],
  },
  {
    name: "Skeleton Park Brewery",
    hasFood: true,
    description: "Dedicated to crafting old-world ales and celebrating life.",
    location: "Kingston, ON",
    author: "61439e56bcfddb08d571dd4c",
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/0256/7054/9586/files/SPB-HeritageSeries-Collection-Small_900x.jpeg?v=1598835406",
        filename: "placeholder2",
      },
    ],
  },
  {
    name: "Stone City Ales",
    hasFood: true,
    description:
      "We are a craft brewery, tap room, bottle shop and kitchen are nestled in the heart of downtown Kingston. Beer to-go, tap room and food 7/week.",
    location: "Kingston, ON",
    author: "61439e56bcfddb08d571dd4c",
    images: [
      {
        url: "https://i1.wp.com/www.sdhopaddict.com/wp-content/uploads/2017/10/Ontario-Breweries-26.jpg?fit=1024%2C608&ssl=1&w=640",
        filename: "placeholder3",
      },
    ],
  },
  {
    name: "Riverhead Brewing Company",
    hasFood: false,
    description: "ADVENTUROUSLY BREWED! Our craft is about the journey, not the destination.",
    location: "Kingston, ON",
    author: "61439e56bcfddb08d571dd4c",
    images: [
      {
        url: "https://media-exp1.licdn.com/dms/image/C4D1BAQEwDGWE6Gn_ng/company-background_10000/0/1532574088861?e=2159024400&v=beta&t=SNCdEmmIT6wOucGU7OOhDgNS4LxGhcyX9puWyog8gbI",
        filename: "placeholder4",
      },
    ],
  },
  {
    name: "Bellwoods Brewery",
    hasFood: true,
    description: "Limited seasonal dishes & a rotating selection of experimental beer in a small brewhouse with patio.",
    location: "Toronto, ON",
    author: "61439e56bcfddb08d571dd4c",
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/0072/8449/0309/files/about_image1_980x.jpg?v=1543204157",
        filename: "placeholder5",
      },
    ],
  },
  {
    name: "Northern Maverick Brewing Company",
    hasFood: true,
    author: "61439e56bcfddb08d571dd4c",
    description: "Expansive brewpub with a large patio serving a locally sourced menu of upscale comfort food.",
    location: "Toronto, ON",
    images: [
      {
        url: "https://live.staticflickr.com/910/41062807424_d2c4bb2b60_b.jpg",
        filename: "placeholder6",
      },
    ],
  },
];
const seedDB = async () => {
  await Brewery.deleteMany({});
  await Brewery.insertMany(breweries);
};

seedDB();
