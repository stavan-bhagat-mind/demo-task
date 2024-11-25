const serviceRoute = require("express").Router();
const {
  getListOfServices,
  getServiceDataFromId,
  addEditService,
  deleteService,
  getListOfServiceReviews,
} = require("../controllers/serviceController");

serviceRoute.get("/all", getListOfServices);
serviceRoute.get("/:id", getServiceDataFromId);
serviceRoute.get("/review/:id", getListOfServiceReviews);
serviceRoute.get("/all-service-review/:id", getListOfServiceReviews);
serviceRoute.post("/add-edit", addEditService);
serviceRoute.delete("/:id", deleteService);

module.exports = serviceRoute;
