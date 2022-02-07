// ENV
require("dotenv").config();
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static("public"));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node native Promise
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DBNAME,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

//SAMPLE ROUTERS
app.use("/todos", require("./src/routes/todos"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
