const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");
const mongoose = require("mongoose");

// database connection
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   createIndexes: true,
//   findOneAndUpdate: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});
  

// Cors Origin
app.use(cors());

// Cookie & Body Parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route Image
app.use("/image", express.static(__dirname + "/src/upload/"));

// Variable router
const mainDshop = require("./src/controllers/dshop/router");


// API Router
app.use("/api/dshop", mainDshop);

//server start
app.listen(config.port, () => console.log(`server started`));
