const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const linkSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    subtitle: { type: String },
    learningAreas: [{type: ObjectId, ref: "Area" }],
    body: { type: String },        
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("LinkPsc", linkSchema);