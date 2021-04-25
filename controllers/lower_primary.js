const Primary = require("../models/lower_primary");
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
exports.primaryById = (req, res, next, id) => {
    Primary.findById(id)
      .exec((err, primary) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.primary = primary;
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
    
      let lprimary = new Primary();
      lprimary.subject = subject;
      lprimary.section = section;
      lprimary.title = title;
      lprimary.learning_area = learning_area;
      lprimary.periods_week = periods_week;
      lprimary.minutes_period = minutes_period;
      lprimary.minutes_week = minutes_week;
      lprimary.hours_week = hours_week;
      lprimary.total_time_week = total_time_week;
                
      lprimary.slug = slugify(learning_area).toLowerCase();

      lprimary.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };

  exports.getLPrimary = (req, res) => {
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
      LowerPrimary.find({ section: section, subject: { $in: subject } })
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
  