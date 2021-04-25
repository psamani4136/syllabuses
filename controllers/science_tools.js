const ScienceP = require("../models/science_tools");
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
exports.scenceById = (req, res, next, id) => {
    Science.findById(id)
      .exec((err, science) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.science = science;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, identifier, introduction, title, resource1, resource2 } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let science = new ScienceP();
      science.subject = subject;
      science.section = section;
      science.title = title;
      science.identifier = identifier;
      science.introduction = introduction;
      science.resource1 = resource1;
      
            
      science.slug = slugify(title).toLowerCase();

      let arrayOfResources = resource2 && resource2.split(",");

      science.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        
        ScienceP.findByIdAndUpdate(
            result._id,
            { $push: { resource2: arrayOfResources } },
            { new: true }
        ).exec((err, data)=>{
            if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
            } else{
                res.json(data)
            }
        })
      });
    });
  };

  exports.getScience = (req, res) => {
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
      ScienceP.find({ section: section, subject: { $in: subject } })
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
  