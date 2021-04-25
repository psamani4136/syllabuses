const LocalBook = require("../models/localBook");    
const formidable = require("formidable");
const slugify = require("slugify");
const { smartTrim } = require("../helpers/strand");
const { errorHandler } = require("../helpers/dbErrorHandler");

//variables from config
const config = require("config");
// const { default: Aim } = require("../../client/components/aim/aimModal");
const appName = config.get("APP_NAME");

//make beyondId available in a request
exports.localBookById = (req, res, next, id) => {
    LocalBook.findById(id)
      .exec((err, localBook) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.localBook = localBook;
        next();
      });
  };
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
      const { name } = fields;
  
      if (!name || name.length === 0) {
        return res.status(400).json({
          error: "A title is required",
        });
      }
  
      let myBook = new LocalBook();
      myBook.name = name;
          
      myBook.slug = slugify(name).toLowerCase();
     
      myBook.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),    
          });
        }
        res.json(result)
      });
    });
  };

  exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    
    LocalBook.findOne({ slug })
      .exec((err, result) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
  };

  exports.list = (req, res) => {
    console.log("THATS IT")
    LocalBook.find({}).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  };