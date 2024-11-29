// All records have unique id. status signifies if that record is ready/available or not.
// There are dependencies among the records. Like => id=4 is dependent on id=3 and id=1, id=3 is having further dependencies.
// A record's name can be fetched if it's status and all it's dependency's are having status=1.
// Also check there should be no circular dependencies like => id=1 is dependent on id=2 and id=2 is dependent on 1

const express = require("express");
const app = express();
const array = [
  {
    id: 1,
    name: "de",
    // dependecies: [0],
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
const Ids = {};
module.exports = function fetchRecord(array, id) {
  if (Ids[id]) {
    return { code: Infinity };
  }
  Ids[id] = true;
  const data = array.find((data) => data.id === id && data.status === 1);

  if (!data) {
    delete Ids[id];
    return { message: "record is not ready / unavailable", code: 0 };
  }

  const check = data?.dependecies?.map((depId) => fetchRecord(array, depId));
  if (check?.length) {
    const includeCodeInfinity = check.some(
      (record) => record.code === Infinity
    );
    if (includeCodeInfinity) {
      delete Ids[id];
      return { message: "circular dependency found", code: Infinity };
    }
    const includeCodeZero = check.some((record) => record.code === 0);
    if (includeCodeZero) {
      delete Ids[id];
      return {
        message: "record's related dependency is not ready / unavailable",
        code: 0,
      };
    }
  }

  delete Ids[id];
  return { message: "fetched successfully", data, code: 1 };
};

// console.log(fetchRecord(array, 4));

app.listen(3003, () => {
  console.log("server is running on 3003");
});
