const Year = require("../models/year");
const Substrand = require("../models/substrand");
const Section = require("../models/section");

const Strand = require("../models/strand");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.yearById = (req, res, next, id) => {
  Year.findById(id)
    .exec((err, year) => {
      if (err || !year) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.year = year; // adds year object in req with year info
      next();
    });
};

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let year = new Year({ name, slug });
  year.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Year.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.yearWithRelatedSubstrands = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { subject } = req.body.substrand;

  Year.findOne({ slug }).exec((err, year) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    
    Substrand.find({ years: year, subject: { $in: subject } })
      .populate("years", "_id name")
      .populate("subject", "_id name slug")
      .populate("strand", "_id title slug")
      .select("id years strand subject title slug")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data);
      });
  });
};


// exports.sectionYearSubstrands = (req, res) => {
//   const slug = req.params.slug.toLowerCase();
//   const { subject } = req.body.syllabus;

//   Year.findOne({ slug }).exec((err, year) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err),
//       });
//     }
//     // console.log(year)
//     Section.find({ years: year })
//         .exec((err, section) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err),
//           });
//         }
//         console.log(section)
//         Substrand.find({ years: year, section: section, subject: { $in: subject } })
//         // .populate("years", "_id name")
//         // .populate("subject", "_id name slug")
//         // .populate("strand", "_id title slug")
//         // .select("id years strand subject title slug")
        
//         .exec((err, data) => {
//           if (err) {
//             return res.status(400).json({
//               error: errorHandler(err),
//             });
//           }
//           res.json({year, section: section, substrands: data});
          
//           });
//         });
//   });
// };

exports.getYearWithAllSubstrands = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { subject } = req.body.syllabus;

  Year.findOne({ slug }).exec((err, year) => {         
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    
    Substrand.find({ years: year, subject: { $in: subject } })
      .populate("years", "_id name")
      .populate("subject", "_id name slug")
      .populate("strand", "_id title slug")
      .select("id years strand subject title slug")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data);
      });
  });
};

// exports.getYearWithAllSubstrands = (req, res) => {
//   // console.log(req.body.substrand);
//   const { _id, subject, years } = req.body.syllabus;

//   Substrand.find({
//     // _id: { $ne: _id },
//     subject: { $in: subject },
//     years: { $in: years },
//   })
//     .select("_id title slug")
//     .exec((err, data) => {
//       if (err) {
//         return res.json({
//           error: errorHandler(err),
//         });
//       }
//       res.json(data);
//     });
// };


exports.yearStrandWithSubstrands = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  
  const { subject } = req.body.strand;
  //console.log(req.body.strand);
  //console.log(subject);
  Year.findOne({ slug }).exec((err, year) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    
    Substrand.find({ years: year, subject: { $in: subject } })
      .populate("years", "_id name")
      .populate("substrands", "_id title slug")
      .populate("subject", "_id title slug")   
      .select("id years subject substrands title slug")
      .exec((err, data) => {    
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(
          data 
        );
      });
  });
};

exports.getSectionYearSubstrands = () => {
  // const slug = req.params.slug.toLowerCase();
  // const { subject } = req.body.syllabus;
  // //console.log(subject)

  // Year.findOne({ slug }).exec((err, year) => {         
  //   if (err) {
  //     return res.status(400).json({
  //       error: errorHandler(err),
  //     });
  //   }
    
  //   Section.find({ years: year}).exec((err, section) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: errorHandler(err),
  //       });
  //     }
      
  //     Substrand.find({ years: year, section: section, subject: { $in: subject } })
  //       .populate("years", "_id name")
  //       .populate("subject", "_id name slug")
  //       .populate("strand", "_id title slug")
  //       .select("id years strand subject title slug")
  //       .exec((err, data) => {
  //         if (err) {
  //           return res.status(400).json({
  //             error: errorHandler(err),
  //           });
  //         }
  //         res.json({section, year: year, });
  //       });
  //   });
  // })
  //const slug = req.params.slug.toLowerCase();
  
  const { subject } = req.body.syllabus;

  // Year.findOne({ slug }).exec((err, year) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: errorHandler(err),
  //     });
  //   }
    console.log(subject)
    // Substrand.find({ years: year, subject: { $in: subject } })
    //   .populate("years", "_id name")
    //   .populate("substrands", "_id title slug")
    //   .populate("subject", "_id title slug")   
    //   .select("id years subject substrands title slug")
    //   .exec((err, data) => {    
    //     if (err) {
    //       return res.status(400).json({
    //         error: errorHandler(err),
    //       });
    //     }
    //     res.json(
    //       data 
    //     );
    //   });
  // });
}

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Year.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Year deleted successfully",
    });
  });
};
