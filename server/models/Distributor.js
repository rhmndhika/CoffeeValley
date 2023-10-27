const mongoose = require("mongoose");

const DistributorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const DistributorModel = mongoose.model("distributors", DistributorSchema);

module.exports = DistributorModel;