const express = require("express");
const bodyParser = require("body-parser");
require("express-async-errors");
require("body-parser-xml")(bodyParser);
const app = express();
const { config } = require("./config/default.config");
const cookieParser = require("cookie-parser");
const path = require("path");
const guestRoute = require("./routes/guest.route");
const categoryRoutes = require("./routes/category.route");
const attractionRoute = require("./routes/attraction.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const reviewRoute = require("./routes/review.route");
const orderRoute = require("./routes/order.route");
const subCategoryRoute = require("./routes/subcategory.route");
const cors = require("cors");

const {
  NOT_FOUND,
  UNAUTHORIZED_ACCESS,
  adminonly,
} = require("./utils/namespace.util");

// HANLDE CORS

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return res.status(200).json({});
  }

  next();
});

// EXPRESS FEATURES AND SETTINGS
app.use(cookieParser(config.server.cookie.secret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.xml());
app.disable("x-powered-by");

// ROUTES
app.use("/user", userRoute);
app.use("/guest", guestRoute);
app.use("/category", categoryRoutes);
app.use("/attraction", attractionRoute);
app.use("/auth", authRoute);
app.use("/review", reviewRoute);
app.use("/order", orderRoute);
app.use("/subcat", subCategoryRoute);

app.get("/", (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: "Backend api running Success 🚀🚀!!",
  });
});
// app.use("/v1/images", express.static(path.join(__dirname, "images")));

// HANDLE 404
app.use((req, res, next) => {
  const error = new Error(NOT_FOUND);
  error.status = 404;
  next(error);
});

// HANDLE GLOBAL ERROR
app.use((err, req, res, next) => {
  console.log("Err" + err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Check Your Server",
    errors: err?.errors || [],
  });
});

module.exports = app;
