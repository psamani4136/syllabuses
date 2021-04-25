const Beyond = require("../../models/beyond_the_word/beyond_the_word_section");

const formidable = require("formidable");
const slugify = require("slugify");
const { smartTrim } = require("../../helpers/strand");
const { errorHandler } = require("../../helpers/dbErrorHandler");

//variables from config
const config = require("config");
// const { default: Aim } = require("../../client/components/aim/aimModal");
const appName = config.get("APP_NAME");

//make beyondId available in a request
exports.beyondById = (req, res, next, id) => {
    Beyond.findById(id)
      .exec((err, beyond) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.beyond = beyond;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { title } = fields;
  
      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
  
      let beyond = new Beyond();
      beyond.title = title;
      
      beyond.slug = slugify(title).toLowerCase();
     
      beyond.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result)
      });
    });
  };

  exports.list = (req, res) => {
    Beyond.find({}).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  };
  