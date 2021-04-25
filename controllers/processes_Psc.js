const ProcessesPsc = require("../models/processes_Psc");
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
exports.ProcessesPscById = (req, res, next, id) => {
    ProcessesPsc.findById(id)
      .exec((err, processesPsc) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.processesPsc = processesPsc;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, identifier, headings, title, skills } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let process = new ProcessesPsc();
      process.subject = subject;
      process.section = section;
      process.introduction = introduction;
      process.title = title;
    
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
        ProcessesPsc.findByIdAndUpdate(
          result._id,
          { $push: { headings: arrayOfHeadings } },
          { new: true }
        ).exec((err, data)=>{
            if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
            } else{
              ProcessesPsc.findByIdAndUpdate(
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

  exports.getProcessPsc = (req, res) => {
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
      ProcessPsc.find({ section: section, subject: { $in: subject } })
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
  