const Social = require("../models/social_tools");
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
exports.socialById = (req, res, next, id) => {
    Social.findById(id)
      .exec((err, social) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.social = social;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, title, supplementary, general } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let social = new Social();
      social.subject = subject;
      social.section = section;
      social.introduction = introduction;
      social.title = title;
    //   social.supplementary = supplementary;
      social.general = general;
            
      social.slug = slugify(title).toLowerCase();

      let arrayOfResources = supplementary && supplementary.split(",");

      social.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        
        Social.findByIdAndUpdate(
            result._id,
            { $push: { supplementary: arrayOfResources } },
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

  exports.getSocial = (req, res) => {
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
      Social.find({ section: section, subject: { $in: subject } })
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
  