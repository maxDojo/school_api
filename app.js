// import npm dependencies
require("./dbConfig");
const debug = require("debug")("generic");
const dbDebug = require("debug")("db");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

// import local dependencies
// const admin = require("./middleware/admin/admin");
// const mgt = require("./middleware/management/management");
const student = require("./modules/students/student");
const academics = require("./modules/academics/academics");

// apply middleware
app.use(cors());
app.use(express.json());
if (app.get("env") === "development") {
  app.use(logger("dev"));
}
// app.use("/admin", admin);
// app.use("/mgt", mgt);
app.use("/student", student);
app.use("/academics", academics);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the school management api!");
});

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Server started on port ${port}`));
