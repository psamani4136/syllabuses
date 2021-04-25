const IssuePsc = require("../models/issue");
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
exports.issuePscById = (req, res, next, id) => {
    IssuePsc.findById(id)
      .exec((err, issuePsc) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.issuePsc = issuePsc;
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
    
      let issuePsc = new IssuePsc();
      issuePsc.subject = subject;
      issuePsc.section = section;
      issuePsc.subtitle = subtitle;
      issuePsc.title = title;
      issuePsc.body = body;
                 
      issuePsc.slug = slugify(title).toLowerCase();

      issuePsc.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };
