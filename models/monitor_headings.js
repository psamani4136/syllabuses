const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const monitorHeadsSchema = new mongoose.Schema(
  {
    subject: { type: ObjectId, ref: "Subject" },
    section: { type: ObjectId, ref: "Section" },
    title: { type: String },
    type: { type: String },
    strategy: { type: String },    
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("MonitorHeading", monitorHeadsSchema);