const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const yearSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    strand: [{ type: ObjectId, ref: "Strand" }],
    substrand: [{ type: ObjectId, ref: "Substrand" }],
    name: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Year", yearSchema);
