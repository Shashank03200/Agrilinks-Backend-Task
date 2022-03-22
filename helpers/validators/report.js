const { body, query, validationResult } = require("express-validator");
const Report = require("../../models/Report");

const postReportValidation = () => {
  return [
    body("reportDetails")
      .exists()
      .withMessage("Invalid request object definition")
      .isObject()
      .withMessage("Invalid request object definition"),

    body("reportDetails.cmdtyID")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : cmdtyID")
      .isString()
      .withMessage("Invalid value for cmdtyID"),

    body("reportDetails.userID")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : UserID")
      .isString()
      .withMessage("Invalid value for userID"),

    body("reportDetails.marketID")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : marketID")
      .isString()
      .withMessage("Invalid value for marketID"),

    // This request parameter is required only when a new report is to be created
    // otherwise this parameter is temporary in case of  updation of an existing report price
    body("reportDetails.marketType").custom(
      async (value, { req, location, path }) => {
        const { cmdtyID, marketID, marketType } = req.body.reportDetails;
        const existingReport = await Report.findOne({ cmdtyID, marketID });

        if (existingReport) {
          return Promise.resolve();
        } else {
          if (!marketType) {
            return Promise.reject("Missing parameter : marketType");
          }
        }
      }
    ),

    body("reportDetails.cmdtyName")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : cmdtyName")
      .isString(),

    body("reportDetails.priceUnit")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : priceUnit")
      .isString(),

    body("reportDetails.convFactor")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : convFactor")
      .isNumeric()
      .withMessage("Invalid Value : convFactor"),

    body("reportDetails.price")
      .exists({ checkFalsy: true })
      .withMessage("Missing parameter : price")
      .isNumeric()
      .withMessage("Invalid Value : price"),
  ];
};

const getReportValidation = () => {
  return [
    query("reportID")
      .exists({ checkFalsy: true })
      .withMessage("Missing query parameter: reportID")
      .isLength({ min: 24, max: 24 }) // Default BSON ObjectID length in mongoDB
      .withMessage("Invalid Report Id"),
  ];
};

const validate = (req, res, next) => {
  // Returns only one error at a time in case of a invalidation

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  let msg = "";
  msg = msg + Object.values(extractedErrors[0])[0];

  return res.status(400).json({
    status: "fail",
    msg,
  });
};

module.exports = {
  postReportValidation,
  getReportValidation,
  validate,
};
