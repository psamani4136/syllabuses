const Area = require("../models/link_areas");
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
exports.areaById = (req, res, next, id) => {
    Area.findById(id)
      .exec((err, area) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.area = area;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, subtitle, body } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let area = new Area();
      area.subject = subject;
      area.section = section;
      area.subtitle = subtitle;
      area.title = title;
      area.body = body;
                 
      area.slug = slugify(title).toLowerCase();

      area.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };
