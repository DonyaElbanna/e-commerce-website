const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const config = require("./config/default.config").config;
const DB_CONNECTED = require("./utils/namespace.util").namespace.DB_CONNECTED;
const { ErrorHandler } = require("./lib/errorhandler.lib");

mongoose
  .connect(
    `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.z4tlytb.mongodb.net/`
    // "mongodb://127.0.0.1:27017/ITI-GP"
  )
  .then(() => {
    console.log(DB_CONNECTED);
    InitServer();
  })
  .catch((error) => {
    console.log(error);
  });

const InitServer = () => {
  http
    .createServer(app)
    .listen(config.server.port, () =>
      console.log(`Server is running on port ${config.server.port} 🚀`)
    );
};
