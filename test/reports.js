process.env.NODE_ENV = "test";

const Report = require("../models/Report");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const mongoose = require("mongoose");

// Assertion style
chai.use(chaiHttp);

describe("Reports API", () => {
  /**
   * Test the POST route
   */

  it("It should create a new report or update the price of an existing one", (done) => {
    const reqObj = {
      reportDetails: {
        userID: "user-1",
        marketID: "market-2",
        marketName: "market-Two",
        marketType: "Mandi",
        cmdtyID: "cmdty-2",
        cmdtyName: "Onion",
        priceUnit: "Kg",
        convFactor: 1,
        price: 40,
      },
    };

    chai
      .request(server)
      .post("/reports")
      .send(reqObj)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a("object");
        response.body.should.have.property("status").eq("success");
        response.body.should.have.property("reportID");
        done();
      });
  });

  it("It should not create a new report and return error", (done) => {
    const reqObj = {
      reportDetails: {
        userID: "user-1",
        marketID: "market-2",
        marketName: "market-Two",
        marketType: "Mandi",
        // cmdtyID: "cmdty-2", // Missing field in request body
        cmdtyName: "Onion",
        priceUnit: "Kg",
        convFactor: 1,
        price: 40,
      },
    };

    chai
      .request(server)
      .post("/reports")
      .send(reqObj)
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.a("object");
        response.body.should.have.property("status").eq("fail");
        response.body.should.have.property("msg");
        done();
      });
  });
});
/**
 * Test the GET route
 */

describe("GET /reports", () => {
  // Succcessful

  it("It should GET a report using reportID", async () => {
    const report = await Report.find().limit(1);
    const reportID = report[0].id;

    chai
      .request(server)
      .get(`/reports?reportID=${reportID}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("_id");
        response.body.should.have.property("cmdtyID");
        response.body.should.have.property("marketID");
        response.body.should.have.property("cmdtyName");
        response.body.should.have.property("marketName");
        response.body.should.have.property("marketType");
        response.body.should.have.property("price");
        response.body.should.have.property("priceUnit");
        response.body.should.have.property("timestamps");
        response.body.should.have.property("users");
        return Promise.resolve();
      });
  });

  // Fail
  it("It should not GET a report if invalid ID", async () => {
    // const reportID = crypto.randomBytes(24).toString("hex");
    var id = new mongoose.Types.ObjectId();

    chai
      .request(server)
      .get(`/reports?reportID=${id}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property("status").eq("fail");
        response.body.should.have.property("msg");
        return Promise.resolve();
      });
  });
});
