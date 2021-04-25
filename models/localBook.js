const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const localBookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 500,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("LocalBook", localBookSchema);