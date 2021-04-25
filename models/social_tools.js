const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const socialSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    supplementary: [{ type: ObjectId, ref: "Supplementary" }],
    general: { type: ObjectId, ref: "General" },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Social", socialSchema);