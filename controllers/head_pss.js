const HeadPss = require("../models/head_pss");
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
exports.HeadPssById = (req, res, next, id) => {
    HeadPss.findById(id)
      .exec((err, headPss) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.headPss = headPss;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, year, making, reflecting, processing, understanding, exploring, strategies, participation } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let headPss = new HeadPss();   
      headPss.subject = subject;
      headPss.section = section;
      headPss.year = year;
      headPss.title = title;
      headPss.making = making;
      headPss.reflecting = reflecting;
      headPss.processing = processing;
      headPss.understanding = understanding;
      headPss.exploring = exploring;
      headPss.strategies = strategies;
      headPss.participation = participation;
            
      headPss.slug = slugify(title).toLowerCase();

      headPss.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getHeadPss = (req, res) => {
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
      HeadPss.find({ section: section, subject: { $in: subject } })
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
  