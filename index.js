const express = require("express");
const app = express();
const path = require("path");
const Brewery = require("./models/brewery");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const engine = require("ejs-mate");

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

mongoose.connect("mongodb://localhost:27017/Yelp-Beer", (err) => {
  if (err) throw err;
  //   console.log("connected to MongoDB");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected");
}).on("error", console.error.bind(console, "Connection Error:"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/breweries/new", (req, res) => {
  res.render("breweries/new");
});

app.get("/breweries/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const brewery = await Brewery.findById(id);
    res.render("breweries/edit", { brewery });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
});

app.get("/breweries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const brewery = await Brewery.findById(id);
    res.render("breweries/show", { brewery });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
});

app.get("/breweries", async (req, res) => {
  const breweries = await Brewery.find({});
  res.render("breweries/index.ejs", { breweries });
});

app.post("/breweries", async (req, res) => {
  const newBrew = new Brewery(req.body);
  await newBrew.save();
  res.redirect(`breweries/${newBrew._id}`);
});

app.put("/breweries/:id", async (req, res) => {
  const { id } = req.params;
  const brewery = await Brewery.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/breweries/${brewery._id}`);
});

app.delete("/breweries/:id", async (req, res) => {
  const { id } = req.params;
  await Brewery.findByIdAndDelete(id);
  res.redirect("/breweries");
});

app.use((req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
