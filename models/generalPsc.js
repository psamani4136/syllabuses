const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const generalPscSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    items1: { type: String },
    items2: { type: String },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("GeneralPsc", generalPscSchema);