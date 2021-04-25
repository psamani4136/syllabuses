const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const substrandTitleSchema = new mongoose.Schema(
  {
    strand: { type: ObjectId, ref: "Strand" },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },

    number: {
      type: Number,
    },
    year: { type: ObjectId, ref: "Year" },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubstrandTitle", substrandTitleSchema);
