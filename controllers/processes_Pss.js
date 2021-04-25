const ProcessesPss = require("../models/processes_Pss");
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
exports.ProcessesPssById = (req, res, next, id) => {
    ProcessPss.findById(id)
      .exec((err, processesPss) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.processesPss = processesPss;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, identifier, body, headings, title, skills } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let process = new ProcessesPss();
      process.subject = subject;
      process.section = section;
      process.introduction = introduction;
      process.title = title;
      process.body = body;
      process.identifier = identifier;
                 
      process.slug = slugify(title).toLowerCase();

      let arrayOfHeadings = headings && headings.split(",");
      let arrayOfSkills = skills && skills.split(",");
      
      process.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        ProcessesPss.findByIdAndUpdate(
          result._id,
          { $push: { headings: arrayOfHeadings } },
          { new: true }
        ).exec((err, data)=>{
            if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
            } else{
              ProcessesPss.findByIdAndUpdate(
                data._id,
                { $push: { skills: arrayOfSkills } },
                { new: true }
              ).exec((err, outcome)=>{
                  if (err) {
                      return res.status(400).json({
                        error: errorHandler(err),
                      });
                  } else{
                   res.json(outcome)
                  }
              })
            }
        })
      });
    });
  };

  exports.getProcessPss = (req, res) => {
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
      ProcessPss.find({ section: section, subject: { $in: subject } })
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
  