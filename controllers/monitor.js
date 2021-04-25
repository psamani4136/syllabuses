const MonitorPsc = require("../models/monitor");
const Section = require("../models/section");
const formidable = require("formidable");
const slugify = require("slugify");
const { smartTrim } = require("../helpers/strand");
const { errorHandler } = require("../helpers/dbErrorHandler");

//variables from config
const config = require("config");
// const { default: Aim } = require("../../client/components/aim/aimModal");
const appName = config.get("APP_NAME");

//make sectionId available in a request
exports.monitorPscById = (req, res, next, id) => {
    MonitorPsc.findById(id)
      .exec((err, monitorPsc) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.monitorPsc = monitorPsc;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, table, title, subtitle, body } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let process = new MonitorPsc();
      process.subject = subject;
      process.section = section;
      process.introduction = introduction;
      process.title = title;
      process.subtitle = subtitle;
      process.body = body;
                       
      process.slug = slugify(title).toLowerCase();

      let arrayOfHeadings = table && table.split(",");
      
      
      process.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        MonitorPsc.findByIdAndUpdate(
          result._id,
          { $push: { table: arrayOfHeadings } },
          { new: true }
        ).exec((err, data)=>{
            if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
            } else{
              res.json(data)
            }
        })
      });
    });
  };
