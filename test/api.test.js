const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
require("dotenv").config();

// Replace 'http://localhost:3000' with your API base URL
const baseUrl = `http://localhost:${process.env.PORT}`;

describe("API Tests", function () {
  this.timeout(5000); // Increase timeout to 5000ms (5 seconds) for all tests in this suite

  it("should get a list of users", async () => {
    const res = await chai.request(baseUrl).get("/v1/users/all");
    console.log("Get Users Response:", res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John6",
      email: "jo6@example.com",
      password: "test@123",
      address: "123 Main St",
    };
    const res = await chai
      .request(baseUrl)
      .post("/v1/users/add-edit")
      .send(newUser);
    console.log("Create User Response:", res.body);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body.message).to.equal("User created successfully.");
  });

  it("should update the user", async () => {
    const updatedUser = {
      id: 3,
      name: "SELl",
      email: "default3@example.com",
      password: "test@123",
      //   address: "456 Elm St",
    };
    const res = await chai
      .request(baseUrl)
      .post("/v1/users/add-edit")
      .send(updatedUser);
    console.log("Update User Response:", res.body);
    // expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.message).to.equal("User updated successfully.");
  });

  it("should delete the user", async () => {
    const res = await chai.request(baseUrl).delete("/v1/users/41");
    console.log("Delete User Response:", res.body);
    expect(res).to.have.status(200);
  });
});
