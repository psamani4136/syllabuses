const MonitorHeading = require("../models/monitor_headings");
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
exports.monitorHeadingById = (req, res, next, id) => {
    MonitorHeadings.findById(id)
      .exec((err, monitorHeadings) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.monitorHeading = monitorHeading;
        next();
      });
  };

  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, type, strategy} = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let monitorHeading = new MonitorHeading();
      monitorHeading.subject = subject;
      monitorHeading.section = section;
      monitorHeading.title = title;
      monitorHeading.type = type;
      monitorHeading.strategy = strategy;
      
                
      monitorHeading.slug = slugify(title).toLowerCase();

      monitorHeading.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };
