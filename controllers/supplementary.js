const Supplementary = require("../models/supplementary");
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
exports.supplementaryById = (req, res, next, id) => {
    Supplementary.findById(id)
      .exec((err, supplementary) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.supplementary = supplementary;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, title, itemNumber, itemName } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let supplementary = new Supplementary();
      supplementary.subject = subject;
      supplementary.section = section;
      supplementary.introduction = introduction;
      supplementary.title = title;
      supplementary.itemNumber = itemNumber;
      supplementary.itemName = itemName;
            
      supplementary.slug = slugify(itemName).toLowerCase();

      supplementary.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getSupplementary = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const { subject } = req.body.syllabus;
    //console.log(subject)
  
    Section.findOne({ slug }).exec((err, section) => {         
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
   
      //onClick for the foreword base on the section and the syllabus
      Supplementary.find({ section: section, subject: { $in: subject } })
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          res.json(data) 
            
        });        
    });
  };
  