const SkillsPss = require("../models/skills_pss");
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
exports.SkillsPssById = (req, res, next, id) => {
    SkillsPss.findById(id)
      .exec((err, skillsPss) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.skillsPss = skillsPss;
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
    
      let skillsPss = new SkillsPss();
      skillsPss.subject = subject;
      skillsPss.section = section;
      skillsPss.year = year;
      skillsPss.title = title;
      skillsPss.making = making;
      skillsPss.reflecting = reflecting;
      skillsPss.processing = processing;
      skillsPss.understanding = understanding;
      skillsPss.exploring = exploring;
      skillsPss.strategies = strategies;
      skillsPss.participation = participation;
            
      skillsPss.slug = slugify(title).toLowerCase();

      skillsPss.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getSkillsPss = (req, res) => {
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
      SkillsPss.find({ section: section, subject: { $in: subject } })
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
  