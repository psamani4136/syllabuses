const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const beyondTitleSchema = new mongoose.Schema(
  { 
    localTitle: { type: ObjectId, ref: "LocalBook"}, 
    heading: { type: ObjectId, ref: "Beyond"},
    title: {
      type: String,
      required: true,
      max: 100,
    },   
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("BeyondTitle", beyondTitleSchema);