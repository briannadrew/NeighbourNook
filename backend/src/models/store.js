const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: { type: String, enum: ["Point"], required: true },
  coordinates: [{ type: Number, required: true }],
});

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  categories: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  location: { type: locationSchema, required: true },
  image: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
