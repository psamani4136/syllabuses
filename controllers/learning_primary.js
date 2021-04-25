const Learning = require("../models/learning_primary");
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
exports.learningById = (req, res, next, id) => {
    Learning.findById(id)
      .exec((err, learning) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.learning = learning;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {

      const { subject, section, identifier, title, introduction, approaches, link_title, links, issues, monitoring} = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let learning = new Learning();
      learning.subject = subject;
      learning.section = section;
      learning.identifier = identifier;
      learning.title = title;
      learning.introduction = introduction;
      learning.approaches = approaches;
      learning.link_title = link_title;
      learning.links = links;
      learning.issues = issues;
      learning.monitoring = monitoring;
                       
      learning.slug = slugify(title).toLowerCase();

      learning.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };
