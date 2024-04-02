const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const myUserRoute = require("./routes/MyUserRoute");
const storeRoute = require("./routes/StoreRoute");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database."));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);
app.use("/api/store", storeRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
