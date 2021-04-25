const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sciencePSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    resource1: { type: ObjectId, ref: "GeneralPsc" },
    resource2: [{ type: ObjectId, ref: "SpecificPsc" }],
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("ScienceP", sciencePSchema);