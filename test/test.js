// test/fetchRecord.test.js
const chai = require("chai");
const expect = chai.expect;
const fetchRecord = require("../task2");

const array = [
  {
    id: 1,
    name: "de",
    dependecies: [],
    status: 1,
  },
  {
    id: 2,
    name: "fv",
    dependecies: [1],
    status: 1,
  },
  {
    id: 3,
    name: "werf",
    dependecies: [2, 1],
    status: 1,
  },
  {
    id: 4,
    name: "werf",
    dependecies: [1, 2],
    status: 1,
  },
];

const circularArray = [
  {
    id: 1,
    name: "de",
    dependecies: [2],
    status: 1,
  },
  {
    id: 2,
    name: "fv",
    dependecies: [1],
    status: 1,
  },
];

describe("fetchRecord function", () => {
  it("should fetch successfully when all dependencies are met", () => {
    const result = fetchRecord(array, 4);
    expect(result.code).to.equal(1);
    expect(result.message).to.equal("fetched successfully");
    expect(result.data.id).to.equal(4);
  });

  it("should return code 0 when the record is not ready/unavailable", () => {
    const result = fetchRecord(array, 5);
    expect(result.code).to.equal(0);
    expect(result.message).to.equal("record is not ready / unavailable");
  });

  it("should return code 0 when a dependency is not ready/unavailable", () => {
    const modifiedArray = [
      {
        id: 1,
        name: "de",
        dependecies: [],
        status: 0, // Making id 1 unavailable
      },
      {
        id: 2,
        name: "fv",
        dependecies: [1],
        status: 1,
      },
      {
        id: 3,
        name: "werf",
        dependecies: [2, 1],
        status: 1,
      },
      {
        id: 4,
        name: "werf",
        dependecies: [1, 2],
        status: 1,
      },
    ];
    const result = fetchRecord(modifiedArray, 4);
    expect(result.code).to.equal(0);
    expect(result.message).to.equal(
      "record's related dependency is not ready / unavailable"
    );
  });

  it("should return code Infinity for circular dependencies", () => {
    const result = fetchRecord(circularArray, 1);
    expect(result.code).to.equal(Infinity);
    expect(result.message).to.equal("circular dependency found");
  });

  it("should return code 1 for a record with no dependencies", () => {
    const result = fetchRecord(array, 1);
    expect(result.code).to.equal(1);
    expect(result.message).to.equal("fetched successfully");
    expect(result.data.id).to.equal(1);
  });
});
