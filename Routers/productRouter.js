const productRoute = require("express").Router();
const {
  getListOfProducts,
  getProductDataFromId,
  addEditProduct,
  deleteProduct,
  getListOfProductReviews,
  bulkAddEditProduct,
} = require("../controllers/productController");

productRoute.get("/all", getListOfProducts);
productRoute.get("/:id", getProductDataFromId);
productRoute.get("/reviews/:id", getListOfProductReviews);
productRoute.post("/add-edit", addEditProduct);
productRoute.delete("/:id", deleteProduct);
productRoute.post("/add-edit-bulk", bulkAddEditProduct);

module.exports = productRoute;
