const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const beyondSchema = new mongoose.Schema(
  {  
    title: {
      type: String,
      required: true,
      max: 100,
    },
       
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Beyond", beyondSchema);