const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const processesPssSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: {type: String},
    body: {type: String},
    headings: [{type: ObjectId, ref: "HeadPss"}],
    introduction: { type: String},
    skills: [{ type: ObjectId, ref: "SkillsPss" }],
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("ProcessesPss", processesPssSchema);
