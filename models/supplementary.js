const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const supplementarySchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    itemNumber: { type: Number },
    itemName: { type: String },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Supplementary", supplementarySchema);