const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const reviewSchema = new Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  country: { type: String, required: true},
  image: { type: String, required: true}
});

// This Activitry creates the collection called activitimodels
const Reviewmodel = mongoose.model("Review", reviewSchema);
module.exports = Reviewmodel;
