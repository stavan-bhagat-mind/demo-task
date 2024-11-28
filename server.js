require("dotenv").config();
const IndexRoute = require("./Routers/IndexRoute");
const Express = require("express");
const app = Express();

const cluster = require("cluster");
const os = require("os");
const express = require("express");

const numCPUs = os.cpus().length;
console.log(numCPUs);
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    worker = cluster.fork();
    worker.on("message", (msg) => {
      console.log(`Message from worker ${worker.process.pid}: ${msg}`);
    });
    worker.send({ type: "worker", id: i });
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  //   const app = express();
  // defining port
  const port = process.env.PORT || 7000;

  // For parsing the express payloads
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));

  // CORS permission
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
  });

  app.use("/", IndexRoute);
  process.on("message", (msg) => {
    if (msg.type === "worker") {
      console.log(`custom Worker ${msg.id} with PID ${process.pid} is running`);
    }
  });
  app.listen(port, () => {
    console.log("Server started on port ", port);
    console.log("DB connected to ", process.env.DB_HOST);
    console.log(`Worker process ${process.pid} is listening on port 3000`);
  });
}
