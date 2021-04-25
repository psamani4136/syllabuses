const BeyondTitle = require("../../models/beyond_the_word/beyond_the_word_title");

const formidable = require("formidable");
const slugify = require("slugify");
const { smartTrim } = require("../../helpers/strand");
const { errorHandler } = require("../../helpers/dbErrorHandler");

//variables from config
const config = require("config");
// const { default: Aim } = require("../../client/components/aim/aimModal");
const appName = config.get("APP_NAME");

//make beyondId available in a request
exports.beyondTitleById = (req, res, next, id) => {
    BeyondTitle.findById(id)
      .exec((err, beyondTitle) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.beyondTitle = beyondTitle;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { localTitle, title, heading } = fields;
  
      if (!localTitle || localTitle.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }

      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }

      if (!heading || heading.length === 0) {
        return res.status(400).json({
          error: "A heading is required",
        });
      }
  
      let beyond = new BeyondTitle();
      beyond.localTitle = localTitle;
      beyond.title = title;
      beyond.heading = heading;
      
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
    BeyondTitle.find({})
    .populate("localTitle", "_id title slug")
    .populate("heading", "_id title slug")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  };