const BeyondText = require("../../models/beyond_the_word/beyond_the_word_text");

const formidable = require("formidable");
const slugify = require("slugify");
const { smartTrim } = require("../../helpers/strand");
const { errorHandler } = require("../../helpers/dbErrorHandler");

//variables from config
const config = require("config");
// const { default: Aim } = require("../../client/components/aim/aimModal");
const appName = config.get("APP_NAME");

//make beyondId available in a request
exports.beyondTextById = (req, res, next, id) => {
    BeyondText.findById(id)
      .exec((err, beyondText) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.beyondText = beyondText;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { book, title, identifier, body } = fields;
  
      if (!book || book.length === 0) {
        return res.status(400).json({
          error: "A book title should be selected",
        });
      }

      if (!title || title.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }

      if (!identifier || identifier.length === 0) {
        return res.status(400).json({
          error: "A unique phrase is required",
        });
      }

      if (!body || body.length === 0) {
        return res.status(400).json({
          error: "A body is required",
        });
      }
  
      let beyondText = new BeyondText();
      beyondText.book = book;
      beyondText.title = title;
      beyondText.identifier = identifier;
      beyondText.body = body;

      beyondText.slug = slugify(identifier).toLowerCase();
     
      beyondText.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result)
      });
    });
  };
  