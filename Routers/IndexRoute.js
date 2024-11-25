const IndexRoute = require("express").Router();
const userRoute = require("../Routers/userRouter");
const productRoute = require("./productRouter");
const serviceRoute = require("./serviceRouter");
const reviewRoute = require("./reviewRouter");

const { LoggerMiddleware } = require("../Middlewares/LoggerMiddleware");

IndexRoute.use("/v1/users", LoggerMiddleware, userRoute);
IndexRoute.use("/v1/products", LoggerMiddleware, productRoute);
IndexRoute.use("/v1/services", LoggerMiddleware, serviceRoute);
IndexRoute.use("/v1/reviews", LoggerMiddleware, reviewRoute);

module.exports = IndexRoute;
