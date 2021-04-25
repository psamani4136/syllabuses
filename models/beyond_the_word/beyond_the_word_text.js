const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const beyondTextSchema = new mongoose.Schema(
  {  
    book: { type: ObjectId, ref: "LocalBook"}, 
    title: { type: ObjectId, ref: "BeyondTitle"},
    identifier: {type: String, required: true,},
    body: {
      type: String,
      required: true,
      max: 5000,
    }, 
    slug: {
        type: String,
        unique: true,
        index: true,
      },  
  },
  { timestamp: true }
);

module.exports = mongoose.model("BeyondText", beyondTextSchema);