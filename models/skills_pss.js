const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const skillsPssSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    year: { type: String },
    making: { type: String },
    reflecting: { type: String },
    processing: { type: String },
    understanding: { type: String},
    strategies: { type: String },
    exploring: { type: String },
    participation: { type: String },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("SkillsPss", skillsPssSchema);