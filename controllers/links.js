const LinkPsc = require("../models/links");
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
exports.linksById = (req, res, next, id) => {
    LinkPsc.findById(id)
      .exec((err, linkpsc) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.linkpsc = linkpsc;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, title, subtitle, learningAreas, body } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let linkPsc = new LinkPsc();
      linkPsc.subject = subject;
      linkPsc.section = section;
      linkPsc.subtitle = subtitle;
      linkPsc.title = title;
      linkPsc.body = body;
                 
      linkPsc.slug = slugify(title).toLowerCase();

      let arrayOfSubjects = learningAreas && learningAreas.split(",");

      linkPsc.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        
        LinkPsc.findByIdAndUpdate(
            result._id,
            { $push: { learningAreas: arrayOfSubjects } },
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
