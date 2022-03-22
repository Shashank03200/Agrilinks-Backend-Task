const router = require("express").Router();

const {
  postReportValidation,
  getReportValidation,
  validate,
} = require("../helpers/validators/report");

const reportController = require("../controllers/reports.controller");

/**
 * POST
 * /reports
 */

router.post("/", postReportValidation(), validate, reportController.postReport);

/**
 * GET
 * /reports?reportID=ID
 */

router.get("/", getReportValidation(), validate, reportController.getReport);

module.exports = router;
