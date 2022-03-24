const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

// All routes are here
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const productRoute = require("./routes/product");

const app = express();

// configuring environment variables.
dotenv.config();

// configuring database connection.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


// Using middleware here.
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// initialising routes of the APIs.
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
