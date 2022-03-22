const mongoose = require("mongoose");

let dbURI = "";

if (process.env.NODE_ENV === "test") {
  dbURI = process.env.MONGODB_TEST_URI;
} else {
  dbURI = process.env.MONGODB_URI;
}

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
