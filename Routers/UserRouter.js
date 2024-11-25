const {
  getListOfUsers,
  getUserDataFromId,
  addEditUser,
  deleteUser,
} = require("../Controllers/UserController.js");

const userRoute = require("express").Router();

userRoute.get("/all", getListOfUsers);
userRoute.get("/:id", getUserDataFromId);
userRoute.delete("/:id", deleteUser);
userRoute.post("/add-edit", addEditUser);

module.exports = userRoute;
