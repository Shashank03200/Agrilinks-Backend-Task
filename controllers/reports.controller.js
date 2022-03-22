const Report = require("../models/Report");

const postReport = async (req, res, next) => {
  try {
    const {
      userID,
      marketID,
      marketName,
      cmdtyID,
      cmdtyName,
      marketType,
      priceUnit,
      convFactor,
      price,
    } = req.body.reportDetails;

    let pricePerKg = price / convFactor;

    const foundReport = await Report.findOne({
      marketID,
      cmdtyID,
    });

    let prevPrice = 0;
    let userPresent = -1; // initially assume user is not present
    if (foundReport) {
      prevPrice = foundReport.price;
      userPresent = foundReport.users.findIndex(
        (item) => item.toString() == userID
      );
      pricePerKg = (prevPrice + pricePerKg) / 2;
    }

    let _report = await Report.findOneAndUpdate(
      { cmdtyID, marketID },
      {
        $set: {
          marketID,
          marketName,
          cmdtyID,
          cmdtyName,
          marketType,
          price: pricePerKg,
        },
      },
      {
        upsert: true,
        returnOriginal: false,
      }
    );

    if (userPresent == -1) {
      await Report.findOneAndUpdate(
        {
          cmdtyID,
          marketID,
        },
        {
          $push: {
            users: userID,
          },
        },
        {
          returnOriginal: false,
        }
      );
    }

    res.status(200).json({
      status: "success",
      reportID: _report.id,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getReport = async (req, res, next) => {
  try {
    const reportID = req.query.reportID;
    reportID;
    const foundReport = await Report.findById(reportID);

    if (!foundReport) {
      return res.status(404).json({
        status: "fail",
        msg: "Report not found",
      });
    }

    res.status(200).json(foundReport);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  postReport,
  getReport,
};
