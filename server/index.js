const express = require("express");
const app = express();
require("dotenv").config();
//cors
const cors = require("cors");
app.use(cors("*"));

//json
app.use(express.json());

//db
const db = require("./models");

//Routers
const routes = require("./routes/index");
app.use("/", routes);

//syncs db with model and then starts server
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
