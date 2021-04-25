const Structure = require("../models/structure");
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
exports.structureById = (req, res, next, id) => {
    Structure.findById(id)
      .exec((err, structure) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.structure = structure;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { subject, section, introduction, identifier, year, title, strand, substrand, glo, slo, sae} = fields;
  
      if (!identifier || identifier.length === 0) {
        return res.status(400).json({
          error: "A statement is requied for the slug development",
        });
      }

      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
    
      let structure = new Structure();
      structure.subject = subject;
      structure.section = section;
      structure.identifier = identifier;
      structure.introduction = introduction;
      structure.title = title;
      structure.year = year;
      structure.strand = strand;
      structure.substrand = substrand;
      structure.glo = glo;
      structure.slo = slo;
      structure.sae = sae;
      
      structure.slug = slugify(title).toLowerCase();

      structure.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data)
      });
    });
  };
  
exports.getStructure = (req, res) => {
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
      Structure.find({ section: section, subject: { $in: subject } })
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
  