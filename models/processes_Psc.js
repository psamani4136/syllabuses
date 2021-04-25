const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const processesPscSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: {type: String},
    
    headings: [{type: ObjectId, ref: "HeadPsc"}],
    introduction: { type: String},
    skills: [{ type: ObjectId, ref: "Primary_Sc_Skill" }],
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("ProcessesPsc", processesPscSchema);
