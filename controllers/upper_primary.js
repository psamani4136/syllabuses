const Upper_Primary = require("../models/upper_primary");
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
exports.UpperPrimaryById = (req, res, next, id) => {
    UpperPrimary.findById(id)
      .exec((err, uprimary) => {
        if (err) {
          return res.status(400).json({      
            error: errorHandler(err),
          });
        }
        req.uprimary = uprimary;
        next();
      });
  };

  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, learning_area, periods_week, minutes_period, minutes_week, hours_week, total_time_week} = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let uprimary = new Upper_Primary();
      uprimary.subject = subject;
      uprimary.section = section;
      uprimary.title = title;
      uprimary.learning_area = learning_area;
      uprimary.periods_week = periods_week;
      uprimary.minutes_period = minutes_period;
      uprimary.minutes_week = minutes_week;
      uprimary.hours_week = hours_week;
      uprimary.total_time_week = total_time_week;
                
      uprimary.slug = slugify(learning_area).toLowerCase();

      uprimary.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getUPrimary = (req, res) => {
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
      UpperPrimary.find({ section: section, subject: { $in: subject } })
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
  