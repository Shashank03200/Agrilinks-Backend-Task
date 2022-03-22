const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    cmdtyName: {
      type: String,
      required: true,
    },
    marketID: {
      type: String,
      required: true,
    },
    marketName: {
      type: String,
      required: true,
    },
    cmdtyID: {
      type: String,
      required: true,
    },
    marketType: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      default: [],
    },
    timestamps: {
      type: String,
      default: Date.now(),
    },
    priceUnit: {
      type: String,
      default: "Kg",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const Report = new mongoose.model("Report", reportSchema);

module.exports = Report;
