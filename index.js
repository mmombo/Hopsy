if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const breweryRoutes = require("./routes/breweries");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/Yelp-Beer';
mongoose.connect(dbURL, (err) => {
  if (err) throw err;
  //   console.log("connected to MongoDB");
});

const db = mongoose.connection;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(mongoSanitize());

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: dbURL,
    secret,
    touchAfter: 24 * 60 * 60,
  }),
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

db.once("open", () => {
  console.log("Database Connected");
}).on("error", console.error.bind(console, "Connection Error:"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.welcome = req.flash("welcome");
  res.locals.currentUser = req.user;
  next();
});

app.use("/breweries", breweryRoutes);
app.use("/breweries/:id/reviews", reviewRoutes);
app.use("/login", userRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("breweries/error", { err });
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
