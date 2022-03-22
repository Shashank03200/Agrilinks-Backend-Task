require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/reports.route");
require("./helpers/init_mongoose");

const app = express();
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/reports", router);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send({ status: "fail", msg: err.message });
});

const server = app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = server;
