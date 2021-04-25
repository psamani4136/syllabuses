const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const monitorSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    introduction: { type: String },
    table: [{ type: ObjectId, ref: "MonitorHeadings" }],
    
    subtitle: { type: String }, 
    body: { type: String },     
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("MonitorPsc", monitorSchema);