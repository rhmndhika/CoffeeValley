const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema({
  bean: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const CatalogModel = mongoose.model("catalogs", CatalogSchema);

module.exports = CatalogModel;