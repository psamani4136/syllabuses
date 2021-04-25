const HeadPsc = require("../models/head_psc");
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
exports.HeadPscById = (req, res, next, id) => {
    HeadPsc.findById(id)
      .exec((err, headPsc) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.headPsc = headPsc;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, year, 
        planning, conducting, 
        processing, 
        evaluating, 
        communication 
      } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let headPsc = new HeadPsc();
      headPsc.subject = subject;
      headPsc.section = section;
      headPsc.year = year;
      headPsc.title = title;
      headPsc.planning = planning;
      headPsc.conducting = conducting;
      headPsc.processing = processing;
      headPsc.evaluating = evaluating;
      headPsc.communication = communication;
            
      headPsc.slug = slugify(title).toLowerCase();

      headPsc.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getHeadPsc = (req, res) => {
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
      HeadPsc.find({ section: section, subject: { $in: subject } })
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
  