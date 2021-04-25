const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const skillsPscSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    year: { type: String },
    planning: { type: String, required: true },
    conducting: { type: String, required: true },
    processing: { type: String, required: true },
    evaluating: { type: String, required: true },
    communication: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Primary_Sc_Skill", skillsPscSchema);