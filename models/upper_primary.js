const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const uprimarycSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    learning_area: { type: String },
    periods_week: { type: Number, required: true },
    minutes_period: { type: Number, required: true },
    minutes_week: { type: Number, required: true },
    hours_week: { type: Number, required: true },
    total_time_week: { type: Number, required: true },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Upper_Primary", uprimarycSchema);