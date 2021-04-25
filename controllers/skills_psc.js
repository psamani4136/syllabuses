const Primary_Sc_Skill = require("../models/skills_psc");
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
exports.primary_Sc_SkillById = (req, res, next, id) => {
  Primary_Sc_Skill.findById(id)
      .exec((err, primary_Sc_skill) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.primary_Sc_skill = primary_Sc_skill;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, year, planning, conducting, processing, evaluating, communication } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",  
        });
      }
    
      let skillsPsc = new Primary_Sc_Skill();
      skillsPsc.subject = subject;
      skillsPsc.section = section;
      skillsPsc.year = year;
      skillsPsc.title = title;
      skillsPsc.planning = planning;
      skillsPsc.conducting = conducting;
      skillsPsc.processing = processing;
      skillsPsc.evaluating = evaluating;
      skillsPsc.communication = communication;
            
      skillsPsc.slug = slugify(title).toLowerCase();

      skillsPsc.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getSkillsPsc = (req, res) => {
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
      SkillsPsc.find({ section: section, subject: { $in: subject } })
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
  