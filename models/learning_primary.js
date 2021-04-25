const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const learningSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    identifier: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    approaches: { type: ObjectId, ref: "Approach" },
    link_title: { type: String },
    links: { type: ObjectId, ref: "LinkPsc" },   
    issues: { type: ObjectId, ref: "IssuePsc" },  
    monitoring: { type: ObjectId, ref: "MonitorPsc" },   
    
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Learning", learningSchema);